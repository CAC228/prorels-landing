// Correct the supplied raster wordmarks at render time while preserving their shapes.
// The source artwork has JPEG colour variation; these matrices map its dominant
// orange, graphite and white to the approved palette in sRGB.
export function BrandPalette() {
  return <svg width="0" height="0" className="brand-palette" aria-hidden="true" focusable="false"><defs>
    <filter id="brand-light-palette" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1.00003482 -0.00178832 -0.00275809 0 0.00451159 0.00400979 0.99920586 -0.00348322 0 0.00026757 -0.00397498 -0.00099417 1.00072513 0 0.00424402 0 0 0 1 0" /></filter>
    <filter id="brand-dark-palette" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0.98820915 0.00057616 0.00756055 0 0.00365415 0.00393750 0.99920187 -0.00343288 0 0.00029351 0.00391585 0.00102010 0.99930522 0 -0.00424117 0 0 0 1 0" /></filter>
  </defs></svg>;
}
