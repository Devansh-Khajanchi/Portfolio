import type { CuratedTrack } from "@/types";

// Add a track:
//   1. Spotify: open the track on web → right-click → Share → Copy link → href
//   2. Album art: open open.spotify.com/embed/track/<ID> → right-click cover →
//      Copy image address → albumImage
//   3. YouTube (for in-modal playback): find the song on youtube.com →
//      copy the v=... part from the URL → youtubeId
// Order is the order shown.

export const curatedTracks: CuratedTrack[] = [
  {
    title: "The Empty Dream Machine",
    artists: ["Gorillaz", "Black Thought", "Johnny Marr", "Anoushka Shankar"],
    album: "The Mountain",
    albumImage: "https://i.scdn.co/image/ab67616d0000b273eeb01b41f48210d032d1b6a4",
    href: "https://open.spotify.com/track/5FH7DTLl8WQNkZs00Cb3EM",
    youtubeId: "T2pwTiQ29hc",
    durationMs: 340874,
  },
  {
    title: "harvest sky",
    artists: ["Oklou", "underscores"],
    album: "choke enough",
    albumImage: "https://i.scdn.co/image/ab67616d0000b27308da36b621d12bb2087cf56c",
    href: "https://open.spotify.com/track/6g2m5644ZTXBzxSt0z5Qwa",
    youtubeId: "haEH7C1lpNI",
    durationMs: 233896,
  },
  {
    title: "Playground Love (with Gordon Tracks)",
    artists: ["Air", "Gordon Tracks"],
    album: "The Virgin Suicides (Original Motion Picture Score)",
    albumImage: "https://i.scdn.co/image/ab67616d0000b273d255944dd08e7fba8197aff8",
    href: "https://open.spotify.com/track/6L5RI9isQPvFyl1yCxnFFb",
    youtubeId: "02YFxCH7EAU",
    durationMs: 212693,
  },
  {
    title: "Instant Crush (feat. Julian Casablancas)",
    artists: ["Daft Punk", "Julian Casablancas"],
    album: "Random Access Memories",
    albumImage: "https://i.scdn.co/image/ab67616d0000b2739b9b36b0e22870b9f542d937",
    href: "https://open.spotify.com/track/2cGxRwrMyEAp8dEbuZaVv6",
    youtubeId: "IJSK_R0ZkGk",
    durationMs: 337560,
  },
  {
    title: "Nightcall",
    artists: ["Kavinsky", "Angèle", "Phoenix"],
    album: "Nightcall",
    albumImage: "https://i.scdn.co/image/ab67616d0000b27382e856e42426e69b8bb43461",
    href: "https://open.spotify.com/track/2KejCKgm7l3uefW9cFt8cH",
    youtubeId: "ANjhFDQqa9A",
    durationMs: 179306,
  },
  {
    title: "Like Him (feat. Lola Young)",
    artists: ["Tyler, The Creator", "Lola Young"],
    album: "CHROMAKOPIA",
    albumImage: "https://i.scdn.co/image/ab67616d0000b273084a94988541c2402615d014",
    href: "https://open.spotify.com/track/6jbYpRPTEFl1HFKHk1IC0m",
    youtubeId: "0Aa1cR6lZ_Q",
    durationMs: 278014,
  },
  {
    title: "joycelyn's dance",
    artists: ["berlioz"],
    album: "open this wall",
    albumImage: "https://i.scdn.co/image/ab67616d0000b273c1c672fa0dd740c2db9e66ae",
    href: "https://open.spotify.com/track/3z0JwddAR5GASTxnKExIw1",
    youtubeId: "NAWtGcMNkzk",
    durationMs: 198500,
  },
  {
    title: "meta angel",
    artists: ["FKA twigs"],
    album: "CAPRISONGS",
    albumImage: "https://i.scdn.co/image/ab67616d0000b273da500ca98cc1971375daab32",
    href: "https://open.spotify.com/track/6EeuY84I1Q3UJvpPN6iSzw",
    youtubeId: "LsGuF6UktX4",
    durationMs: 259466,
  },
];
