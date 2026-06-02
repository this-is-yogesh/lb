1. i put the ref on img instead of div so while sliding it was forming a shadown
type of effect and was not smooth
reason : 
I initially attached the ref to the overlay image. Since the overlay image width changes as the slider moves, getBoundingClientRect().width also changes every render. My mouse position calculation was therefore using a moving coordinate system, causing unstable slider values and visual jitter. Moving the ref to the fixed-width container gave me a stable coordinate system and smooth dragging.

2. i didnt add the isDragging dependency in useEffect and slider was not moving

When I removed isDragging from the dependency array, the slider stopped moving because of a stale closure. The mousemove listener was attached only once during the initial render, when isDragging was false. As a result, the handleMouseMove function registered with the window always captured and remembered that initial value. Even after calling setIsDragging(true), React re-rendered the component, but the already attached event listener continued using the old function that saw isDragging as false, so it immediately returned on every mouse move. Adding isDragging to the dependency array works because React removes the old listener and attaches a new one whenever isDragging changes, ensuring the listener has access to the latest state. An alternative approach is to store the dragging state in a ref, which avoids reattaching listeners and prevents stale closure issues.
    draggerRef.current = false ,    draggerRef.current = true