/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
				impact:
					"Impact, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        schmaltzy:
        "Schmaltzy, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
			},
    }
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")]
};