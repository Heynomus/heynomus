'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main style={{padding:'15vh 10vw'}}><h1>This view couldn’t be loaded.</h1><p>Your saved research is separate from this page.</p><button onClick={reset}>Try again</button> <a href="/">Return home</a></main>;}
