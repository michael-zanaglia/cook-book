// // Cette fonction prend un délai en millisecondes et une fonction à exécuter
// export function debounce(func: Function, ms: number){
//     // On crée une variable pour stocker l'identifiant de notre minuteur
//     let timeoutId: ReturnType<typeof setTimeout>;
//     // On renvoie une nouvelle fonction que vous pourrez appeler plus tard
//     return function (...args: any[]) {
//         if(timeoutId) clearTimeout(timeoutId);
//         // On programme un nouveau minuteur
//         timeoutId = setTimeout(() => {
//         // Après le délai, on exécute la fonction avec tous les arguments
//           func(...args);
//         }, ms);
//     }
// }

export const debounce = (searchFunction :( ...args : any[]) => void, delay : number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any[]){
    clearTimeout(timer);
    timer = setTimeout(()=>{
      searchFunction(...args)
    }, delay);
  }
}
