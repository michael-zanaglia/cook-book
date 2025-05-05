export const tagMapping = (value: string) => {
    const valueUpper = value.toUpperCase()
    const mapping : Record<string, string>= {
        'DESSERT': "Dessert",
        'PLAT': "Plat",
        'ENTREE': "Entrée",
        'EXOTIQUE': "Exotique",
        'NUMBER_ONE': "#1",
        'MOST_POPULAR': "Tendance",
        'DRINK': "Boisson",
        'VEGAN': "Vegan",
        'HEALTH': "Santé",
        'FAST': "Rapide",
        'CHEAP': "Pas cher",
        'FRENCH': "Français",
        'ASIAN': "Asiatique",
        'LACTOSE_FREE': "Sans lactose",
        'NO_GLUTEN': "Sans gluten",
        'BIG_MOMENT': "Grande occasion",
        'BREAKFAST': "Petit-déjeuner",
    }

    return mapping[valueUpper] || "Inconnu";
}