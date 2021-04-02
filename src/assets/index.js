// logo

export { default as imgDota } from './img/dota.png'

// hero

export const imgHero = (name) => ({
  uri: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name.slice(
    14
  )}_full.png`
})

export const imgHeroFull = (name) => ({
  uri: `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${name.slice(
    14
  )}.png`
})

export const imgHeroAttribute = (id) => ({
  uri: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${
    id === 0 ? 'strength' : id === 1 ? 'agility' : 'intelligence'
  }.png`
})

export const imgAbility = (name) => ({
  uri: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${name}.png`
})

export const videoAbility = (hero, name) => ({
  uri: `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/${hero.slice(
    14
  )}/${name}.mp4`
})
