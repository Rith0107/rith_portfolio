import { useEffect } from 'react'

let lockCount = 0
let savedScrollY = 0

// iOS Safari ignores `overflow: hidden` on the body while a touch is in
// progress (it still rubber-bands), so the reliable cross-browser lock is to
// pin the body at its current scroll offset with `position: fixed` and
// restore the scroll position on unlock. Reference-counted so a modal-inside-
// a-modal (or fast open/close) can't unlock a scroll another lock still needs.
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    if (lockCount === 0) {
      savedScrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
    }
    lockCount += 1

    return () => {
      lockCount -= 1
      if (lockCount === 0) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        window.scrollTo(0, savedScrollY)
      }
    }
  }, [locked])
}
