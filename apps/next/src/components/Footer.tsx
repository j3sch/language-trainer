const navigation = {
  main: [
    { name: 'About', href: '#' },
    { name: 'Imprint', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  social: [],
};

export default function Footer() {
  return (
    <footer className="flex flex-1 flex-col justify-end bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-6 sm:py-8 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          &copy; 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
