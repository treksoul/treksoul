import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Props = { currency: string; amount: number }

export function PriceBadge({ currency, amount }: Props) {
  const formatted = new Intl.NumberFormat(
    // you can swap in your user’s locale if you like, e.g. 'ne-NP'
    'en-US',
    {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  ).format(amount)
  return formatted
}
