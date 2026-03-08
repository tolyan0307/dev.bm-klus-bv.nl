let loadPromise: Promise<typeof google.maps> | null = null

/**
 * Lazily loads the Google Maps JavaScript API and returns the `google.maps`
 * namespace. Subsequent calls return the same cached promise.
 *
 * Only the "places" library is requested — no map UI is loaded.
 */
export function loadGoogleMaps(apiKey: string): Promise<typeof google.maps> {
  if (loadPromise) return loadPromise

  loadPromise = new Promise<typeof google.maps>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("google-maps-loader: called on the server"))
      return
    }

    if (typeof window.google !== "undefined" && window.google.maps) {
      resolve(window.google.maps)
      return
    }

    const callbackName = "__gmapsReady_" + Date.now()

    const script = document.createElement("script")
    script.src =
      `https://maps.googleapis.com/maps/api/js` +
      `?key=${encodeURIComponent(apiKey)}` +
      `&libraries=places` +
      `&loading=async` +
      `&callback=${callbackName}`
    script.async = true
    script.defer = true

    ;(window as unknown as Record<string, unknown>)[callbackName] = () => {
      delete (window as unknown as Record<string, unknown>)[callbackName]
      resolve(window.google.maps)
    }

    script.onerror = () => {
      loadPromise = null
      delete (window as unknown as Record<string, unknown>)[callbackName]
      reject(new Error("google-maps-loader: script failed to load"))
    }

    document.head.appendChild(script)
  })

  return loadPromise
}
