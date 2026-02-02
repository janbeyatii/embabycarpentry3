export const CATEGORY_SUMMARIES: Record<string, string> = {
  Kitchens: 'Custom kitchen renovations with cabinetry, countertops, and modern fixtures. Transform your space with expert design and installation.',
  Bathrooms: 'Bathroom remodeling and renovation services. Quality fixtures, tile work, and attention to detail for spaces you\'ll love.',
  Basement: 'Basement finishing and renovation. Create additional living space with professional craftsmanship and proper insulation.',
  Decks: 'Custom deck construction for outdoor living. Durable, quality-built decks that extend your home\'s usable space.',
  Fences: 'Privacy, boundary, and decorative fencing. Quality installation with materials built to last.',
  'Sheds, Gazebos & Pergolas': 'Custom outdoor structures tailored to your property. Storage sheds, shade structures, and backyard focal points.',
  Cabinetry: 'Custom cabinetry and built-ins. Precision craftsmanship for kitchens, offices, and storage solutions.',
  Backsplash: 'Tile and backsplash installation. Add style and protection to your walls with expert finishing.',
  Sheds: 'Custom shed construction for storage and workspace. Built to your specifications and local codes.',
  Flooring: 'Professional flooring installation. Vinyl, hardwood, laminate, and more for lasting beauty.',
}

export function getCategorySummary(category: string): string {
  return CATEGORY_SUMMARIES[category] ?? `Our ${category} projects showcase quality craftsmanship and attention to detail.`
}
