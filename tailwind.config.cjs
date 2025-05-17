/* eslint-disable no-undef */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
  theme: {
    extend: {
      colors: {
        'theme-default': 'var(--default-bg)',
        'theme-default-alt': 'var(--default-alt-bg)',
        'theme-default-dark': 'var(--default-dark-bg)',
        'theme-default-backdrop': 'var(--default-backdrop)',
        'theme-default-hover': 'var(--default-hover-bg)',
        'theme-default-disabled': 'var(--default-disabled-bg)',

        'theme-primary': 'var(--primary-bg)',
        'theme-primary-lite': 'var(--primary-lite-bg)',
        'theme-primary-hover': 'var(--primary-hover-bg)',
        'theme-primary-disabled': 'var(--primary-disabled-bg)',

        'theme-secondary': 'var(--secondary-bg)',
        'theme-secondary-dark': 'var(--secondary-dark-bg)',
        'theme-secondary-hover': 'var(--secondary-hover-bg)',
        'theme-secondary-disabled': 'var(--secondary-disabled-bg)',

        'theme-positive': 'var(--positive-bg)',
        'theme-positive-lite': 'var(--positive-lite-bg)',
        'theme-positive-hover': 'var(--positive-hover-bg)',
        'theme-positive-disabled': 'var(--positive-disabled-bg)',

        'theme-negative': 'var(--negative-bg)',
        'theme-negative-lite': 'var(--negative-lite-bg)',
        'theme-negative-hover': 'var(--negative-hover-bg)',
        'theme-negative-disabled': 'var(--negative-disabled-bg)',

        'theme-warning': 'var(--warning-bg)',
        'theme-warning-lite': 'var(--warning-lite-bg)',

        'theme-muted': 'var(--muted-bg)',
        'theme-highlight': 'var(--highlight-bg)',
      },
      textColor: {
        'theme-brand': 'var(--brand-text)',
        'theme-link': 'var(--link-text)',
        'theme-muted': 'var(--muted-text)',

        'theme-default': 'var(--default-text)',
        'theme-on-default': 'var(--text-on-default)',
        'theme-on-default-hover': 'var(--text-on-default-hover)',
        'theme-on-default-disabled': 'var(--text-on-default-disabled)',

        'theme-primary': 'var(--primary-text)',
        'theme-on-primary': 'var(--text-on-primary)',
        'theme-on-primary-hover': 'var(--text-on-primary-hover)',
        'theme-on-primary-disabled': 'var(--text-on-primary-disabled)',

        'theme-secondary': 'var(--secondary-text)',
        'theme-on-secondary': 'var(--text-on-secondary)',
        'theme-on-secondary-hover': 'var(--text-on-secondary-hover)',
        'theme-on-secondary-disabled': 'var(--text-on-secondary-disabled)',

        'theme-positive': 'var(--positive-text)',
        'theme-on-positive': 'var(--text-on-positive)',
        'theme-on-positive-hover': 'var(--text-on-positive-hover)',
        'theme-on-positive-disabled': 'var(--text-on-positive-hover)',

        'theme-negative': 'var(--negative-text)',
        'theme-on-negative': 'var(--text-on-negative)',
        'theme-on-negative-hover': 'var(--text-on-negative-hover)',
        'theme-on-negative-disabled': 'var(--text-on-negative-hover)',

        'theme-warning': 'var(--warning-text)',
      },
      borderColor: {
        /* Default Theme */
        'theme-default': 'var(--default-border)',
        'theme-default-hover': 'var(--default-hover-border)',
        'theme-default-disabled': 'var(--default-disabled-border)',

        /* Primary Theme */
        'theme-primary': 'var(--primary-border)',
        'theme-primary-hover': 'var(--primary-hover-border)',
        'theme-primary-disabled': 'var(--primary-disabled-border)',

        /* Secondary Theme */
        'theme-secondary': 'var(--secondary-border)',
        'theme-secondary-hover': 'var(--secondary-hover-border)',
        'theme-secondary-disabled': 'var(--secondary-disabled-border)',

        /* Positive Theme */
        'theme-positive': 'var(--positive-border)',
        'theme-positive-hover': 'var(--positive-hover-border)',
        'theme-positive-disabled': 'var(--positive-disabled-border)',

        /* Negative Theme */
        'theme-negative': 'var(--negative-border)',
        'theme-negative-hover': 'var(--negative-hover-border)',
        'theme-negative-disabled': 'var(--negative-disabled-border)',

        /* Warning THeme */
        'theme-warning': 'var(--warning-border)',
      },
      ring: {
        'theme-warning': 'var(--warning-border)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
