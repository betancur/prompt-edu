import * as HeroIcons from '@heroicons/react/24/outline';

function CategoryCard({ title, count, icon, onClick }) {
  // Transform the database icon name to PascalCase with "Icon" suffix
  const pascalCaseIconName = icon
    .split('-') // Split on hyphen
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
    .join('') + 'Icon'; // Join and add "Icon" suffix

  // Resolve the Heroicon dynamically
  const HeroIcon = HeroIcons[pascalCaseIconName];

  return (
    <div
      className="border rounded-md p-4 text-center shadow-sm hover:shadow-md cursor-pointer transition-shadow"
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3">
        {HeroIcon ? (
          <HeroIcon className="w-10 h-10 text-gray-600" />
        ) : (
          <div className="text-3xl">❓</div> // Fallback icon
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{count}</p>
      </div>
    </div>
  );
}

export default CategoryCard;