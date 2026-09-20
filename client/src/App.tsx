function App() {
    return (
        <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
            <div className="mx-auto flex max-w-3xl flex-col gap-10">
                <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <img
                        src="/profile.png"
                        alt="Profile"
                        className="h-28 w-28 rounded-2xl object-cover"
                    />

                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Angry Pigs</h1>

                        <p className="mt-2 max-w-xl text-zinc-400">
                            Computer science, music, games and various things I make on the
                            internet.
                        </p>
                    </div>
                </header>

                <section>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                        Links
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <a
                            href="https://www.youtube.com/@angrypigs_71830"
                            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-800"
                        >
                            <h3 className="font-semibold">YouTube</h3>

                            <p className="mt-1 text-sm text-zinc-400">My music and releases.</p>
                        </a>
                        <a
                            href="https://github.com/angrypigs"
                            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-800"
                        >
                            <h3 className="font-semibold">GitHub</h3>

                            <p className="mt-1 text-sm text-zinc-400">
                                My projects and repositories.
                            </p>
                        </a>

                        <a
                            href="/games"
                            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-800"
                        >
                            <h3 className="font-semibold">Games</h3>

                            <p className="mt-1 text-sm text-zinc-400">Currently unavailable.</p>
                        </a>
                    </div>
                </section>

                <footer className="border-t border-zinc-900 pt-6 text-sm text-zinc-600">
                    © 2026 Angry Pigs
                </footer>
            </div>
        </main>
    )
}

export default App
