import cn from 'classnames';

export default function Search({ className = 'text-black' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('w-5 h-5', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  );
}
