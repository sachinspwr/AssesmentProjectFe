// classUtils.ts
export function getNavLinkClass(isActive: boolean): string {
  return `flex items-center justify-center w-12 h-12 mt-2 relative group rounded ${
    isActive ? 'bg-gray-300' : 'hover:bg-gray-300'
  }`;
}

export function getSidebarClass(isActive: boolean): string {
  return `flex items-center justify-center w-16 h-16  relative group ${
    isActive ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'
  }`;
}
