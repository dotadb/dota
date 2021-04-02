export const heroAttribute = (id) =>
  id === 0 ? 'Strength' : id === 1 ? 'Agility' : 'Intelligence'

export const heroDescription = (description) =>
  description.replace(/<b>/g, '').replace(/<\/b>/g, '')

export const heroAbilityDescription = (ability) =>
  ability.desc_loc
    .replace(/%([\w_]+)%/g, (id) => {
      const value = ability.special_values.find(
        ({ name }) => `%${name}%` === id
      )

      console.log(id, value)

      return value
        ? value.values_float.length > 0
          ? value.values_float[0]
          : value.values_int.length > 0
          ? value.values_int[0]
          : 0
        : 0
    })
    .replace(/%%/g, '%')
