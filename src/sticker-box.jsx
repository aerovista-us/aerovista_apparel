import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const roomImage = `${import.meta.env.BASE_URL}store/interior.svg`

function hash(value) {
  let h = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function stickerPieces(products) {
  const pieces = []
  for (const product of products) {
    if (product?.type !== 'sticker') continue
    const images = [...new Set((product.images?.length ? product.images : [product.image]).filter(Boolean))].slice(0, 4)
    images.forEach((image, index) => {
      const seed = hash(`${product.id}:${index}`)
      pieces.push({
        key: `${product.id}:${index}`,
        product,
        image,
        x: 28 + (seed % 44),
        y: 24 + ((seed >>> 8) % 46),
        rot: (seed % 42) - 21,
        vx: 0,
        vy: 0,
        vr: 0,
        z: pieces.length + 1,
      })
    })
  }
  return pieces
}

function shove(piece, pieces, gain = 0.34) {
  for (const other of pieces) {
    if (other === piece) continue
    const dx = other.x - piece.x
    const dy = other.y - piece.y
    const dist = Math.hypot(dx, dy) || 0.01
    const min = 16
    if (dist >= min) continue
    const push = (min - dist) * gain
    const nx = dx / dist
    const ny = dy / dist
    other.x = clamp(other.x + nx * push, 14, 86)
    other.y = clamp(other.y + ny * push, 16, 82)
    other.rot += (nx >= 0 ? 1 : -1) * push * 0.18
    if (Math.hypot(piece.vx, piece.vy) > 0.2) {
      other.vx = clamp(other.vx + piece.vx * 0.18 + nx * 0.35, -4, 4)
      other.vy = clamp(other.vy + piece.vy * 0.18 + ny * 0.35, -4, 4)
      other.vr = clamp(other.vr + nx * 0.4, -6, 6)
    }
  }
}

function loosen(pieces) {
  for (let round = 0; round < 12; round += 1) {
    for (const piece of pieces) shove(piece, pieces, 0.2)
  }
}

function pieceLabel(product, priceLabel) {
  const price = priceLabel(product)
  return price && price !== 'Preview' ? `${product.shortName}, ${price}` : product.shortName
}

export function StickerBoxButton({ products, onOpen }) {
  const pieces = stickerPieces(products)
  if (!pieces.length) return null
  return (
    <button type="button" className="sticker-box-button" onClick={onOpen} aria-label="Open the sticker box">
      <span className="sticker-box-button-body">
        <span className="sticker-box-button-face sticker-box-button-front" aria-hidden="true"/>
        <span className="sticker-box-button-face sticker-box-button-side" aria-hidden="true"/>
        <span className="sticker-box-button-sheet" aria-hidden="true">
          {pieces.map(piece => (
            <img
              key={piece.key}
              src={piece.image}
              alt=""
              draggable="false"
              style={{ left: `${piece.x}%`, top: `${piece.y}%`, transform: `translate(-50%, -50%) rotate(${piece.rot}deg)` }}
            />
          ))}
          <span className="sticker-box-button-caption">STICKER BOX</span>
        </span>
      </span>
    </button>
  )
}

export function StickerBox({ products, priceLabel, onClose, onSelect }) {
  const boardRef = useRef(null)
  const closeRef = useRef(null)
  const piecesRef = useRef(null)
  if (!piecesRef.current) {
    const opening = stickerPieces(products)
    loosen(opening)
    piecesRef.current = opening
  }
  const dragRef = useRef(null)
  const loopRef = useRef(() => {})
  const topZ = useRef(piecesRef.current.length + 1)
  const movedRef = useRef(false)
  const [revision, setRevision] = useState(0)
  const [hint, setHint] = useState('')
  const pieces = piecesRef.current

  useEffect(() => {
    const next = stickerPieces(products)
    const current = piecesRef.current
    const same = next.length === current.length && next.every((piece, index) => piece.key === current[index]?.key)
    if (!same) {
      loosen(next)
      piecesRef.current = next
      topZ.current = next.length + 1
      setRevision(value => value + 1)
    }
  }, [products])

  useEffect(() => {
    closeRef.current?.focus()
    let frame = 0
    let last = performance.now()
    const tick = now => {
      frame = 0
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const step = Math.min(2, (now - last) / 16.67)
      last = now
      let moving = false
      if (!reduced) {
        for (const piece of piecesRef.current) {
          if (dragRef.current?.key === piece.key) continue
          if (Math.hypot(piece.vx, piece.vy) < 0.04 && Math.abs(piece.vr) < 0.04) {
            piece.vx = 0
            piece.vy = 0
            piece.vr = 0
            continue
          }
          moving = true
          piece.x += piece.vx * step
          piece.y += piece.vy * step
          piece.rot += piece.vr * step
          const drag = Math.pow(0.9, step)
          piece.vx *= drag
          piece.vy *= drag
          piece.vr *= drag
          shove(piece, piecesRef.current, 0.22)
          if (piece.x < 12 || piece.x > 88) {
            piece.x = clamp(piece.x, 12, 88)
            piece.vx *= -0.42
            piece.vr += piece.vx * 0.5
          }
          if (piece.y < 14 || piece.y > 84) {
            piece.y = clamp(piece.y, 14, 84)
            piece.vy *= -0.42
          }
        }
      }
      if (moving) {
        setRevision(value => value + 1)
        frame = requestAnimationFrame(tick)
      }
    }
    loopRef.current = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    return () => cancelAnimationFrame(frame)
  }, [])

  function bump(piece) {
    topZ.current += 1
    piece.z = topZ.current
    setRevision(value => value + 1)
  }

  function onPointerDown(event, piece) {
    if (event.button != null && event.button !== 0) return
    const board = boardRef.current?.getBoundingClientRect()
    if (!board) return
    try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* mouse fallback still tracks the drag */ }
    piece.vx = 0
    piece.vy = 0
    piece.vr = 0
    dragRef.current = {
      key: piece.key,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: piece.x,
      originY: piece.y,
      originRot: piece.rot,
      board,
      samples: [{ t: performance.now(), x: event.clientX, y: event.clientY }],
    }
    movedRef.current = false
    bump(piece)
    setHint(pieceLabel(piece.product, priceLabel))
    if (event.pointerType == null) {
      const move = (ev) => onPointerMove(ev)
      const up = (ev) => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', up)
        onPointerUp(ev)
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    }
  }

  function onPointerMove(event) {
    const drag = dragRef.current
    if (!drag || (event.pointerId != null && drag.pointerId != null && event.pointerId !== drag.pointerId)) return
    const piece = piecesRef.current.find(item => item.key === drag.key)
    if (!piece) return
    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY
    if (Math.hypot(dx, dy) > 6) movedRef.current = true
    piece.x = clamp(drag.originX + (dx / drag.board.width) * 100, 12, 88)
    piece.y = clamp(drag.originY + (dy / drag.board.height) * 100, 14, 84)
    piece.rot = drag.originRot + dx * 0.045
    shove(piece, piecesRef.current, 0.4)
    drag.samples.push({ t: performance.now(), x: event.clientX, y: event.clientY })
    if (drag.samples.length > 6) drag.samples.shift()
    setRevision(value => value + 1)
  }

  function onPointerUp(event) {
    const drag = dragRef.current
    if (!drag || (event.pointerId != null && drag.pointerId != null && event.pointerId !== drag.pointerId)) return
    const piece = piecesRef.current.find(item => item.key === drag.key)
    dragRef.current = null
    if (!piece || !movedRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const first = drag.samples[0]
    const last = drag.samples[drag.samples.length - 1]
    const dt = Math.max(16, last.t - first.t)
    const frames = dt / 16.67
    piece.vx = clamp((((last.x - first.x) / drag.board.width) * 100) / frames, -7, 7)
    piece.vy = clamp((((last.y - first.y) / drag.board.height) * 100) / frames, -7, 7)
    piece.vr = clamp(piece.vx * 1.15, -8, 8)
    loopRef.current()
  }

  function onKeyDown(event, piece) {
    const step = event.shiftKey ? 12 : 6
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key]
    if (!delta) return
    event.preventDefault()
    piece.x = clamp(piece.x + delta[0], 12, 88)
    piece.y = clamp(piece.y + delta[1], 14, 84)
    bump(piece)
    setHint(pieceLabel(piece.product, priceLabel))
  }

  return (
    <div className="sticker-box-page" data-revision={revision}>
      <div className="sticker-box-room" style={{ backgroundImage: `url(${roomImage})` }} aria-hidden="true"/>
      <button type="button" className="sticker-box-scrim" onClick={onClose} aria-label="Close the sticker box"/>
      <section className="sticker-board" role="dialog" aria-modal="true" aria-labelledby="sticker-box-title" ref={boardRef}>
        <div className="sticker-box-lid" aria-hidden="true"><span>AEROVISTA</span></div>
        <header className="sticker-board-bar">
          <div>
            <span className="eyebrow" id="sticker-box-title">MEN'S GALLERY</span>
            <strong>Sticker box</strong>
          </div>
          <button ref={closeRef} type="button" className="sticker-box-close" onClick={onClose} aria-label="Close the sticker box"><X size={16}/></button>
        </header>
        <div className="sticker-board-sheet">
          {pieces.map(piece => (
            <button
              key={piece.key}
              type="button"
              className={`sticker-piece${dragRef.current?.key === piece.key ? ' is-dragging' : ''}`}
              style={{ left: `${piece.x}%`, top: `${piece.y}%`, zIndex: piece.z, '--rot': `${piece.rot}deg` }}
              aria-label={`${piece.product.name}. Drag to move, or press to buy.`}
              onPointerDown={event => onPointerDown(event, piece)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onMouseDown={event => { if (!dragRef.current) onPointerDown(event, piece) }}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') movedRef.current = false
                onKeyDown(event, piece)
              }}
              onClick={() => {
                if (movedRef.current) {
                  movedRef.current = false
                  return
                }
                onSelect(piece.product)
              }}
              onFocus={() => setHint(pieceLabel(piece.product, priceLabel))}
              onPointerEnter={() => setHint(pieceLabel(piece.product, priceLabel))}
            >
              <img src={piece.image} alt="" draggable="false"/>
              <span className="sticker-piece-tag">{pieceLabel(piece.product, priceLabel)}</span>
            </button>
          ))}
        </div>
        <p className="sticker-board-hint">{hint || 'Grab a sticker. Toss it through the pile. Tap one to buy.'}</p>
      </section>
    </div>
  )
}
