# Shortcut (URL Shortener)

Originally conceived as my college project, Shortcut has evolved over time with occasional refinements. This project aims to overcome the shortcomings found in existing URL shorteners.

## Tech Stack

**Client:** Nextjs, Typescript

**Server:** Nextjs, Typescript, Prisma, Zod, MongoDB

## Features

- Link shortening with custom backhalf
- QR Codes
- Can Edit Links and QR codes
- User friendly design
- Minimalistic design
- Overview (Track your links/QRs)

## Demo

https://shortcut-theta.vercel.app/

## Known Bugs

- UI doesn't populate after instant login
- Some errors are not properly handled
- Authentication session doesn't persist on browser restart

## Future Plans

- Rework API strucutre
- Public API (With Documentation)
- URL Shortenining without Login (Kind of Demo)
- Track links and engagements effectively

## Screenshots

**Home Page** (I went for minimalistic design)
![App Screenshot](https://i.imgur.com/MGBSj0T.png)

**Login Page**
![App Screenshot](https://i.imgur.com/jlt5ifm.png)

**Dashboard**
![App Screenshot](https://i.imgur.com/WNvND46.png)

**Links Card**
![App Screenshot](https://i.imgur.com/qVpz1C6.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Wiper-R/shortcut
```

Go to the project directory

```bash
  cd shortcut
```

Rename .env.example to .env and set environment variables

Install pnpm if not already

```bash
  npm i pnpm -g
```

Install dependencies

```bash
  pnpm install
```

Generate Prisma client

```bash
  prisma generate
```

Start the dev server

```bash
  pnpm dev
```

## Contributing

Contributions are always welcome!

## Authors

- [@Wiper-R](https://www.github.com/Wiper-R)

## License

[MIT](https://choosealicense.com/licenses/mit/)
