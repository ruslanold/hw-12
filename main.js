// Треба реалізувати свій розпорядок дня. 
// Колбеками, промісами та асинк авейт.

// В дні має бути від 7 до 10 подій. Всі події мають мати описані успішні та не успішні варіанти виконання. 
// Має бути так
// 1) прокинувся
// 2) Поснідав
// 3) почистав зуби 
// і т.д.

// Якщо щось пішло не так (нема шо їсти), то має бути викинута помилка і решта функцій виконуватись не мають. 
// Якщо ж все ок, то ви маєте прожити свій звичайний день.
// Кожна подія має бути з рандомною (не по зростанню) затримкою.


const wraper = callback => new Promise(callback)

async function dayZ() {
    try {
        let money = 0
        let refrigerator = {
            food: ['apple', 'eggs']
        }
        let toothpaste = true
        let time = 6

        const wakeUp = await wraper((res, rej) => {
            if(time == 6) {
                setTimeout(() => {
                    return res('Good morning')
                }, 1000)
            }else{
                return rej('Проспал')
            }
        })

        console.log(wakeUp);
        console.log('Some moments later', time++);

        const breakfast = await wraper((res, rej) => {
            if(refrigerator.food) {
                setTimeout(() => {
                    refrigerator.food = null
                    return res('Позавтракал')
                }, 1000)
            }else{
                return rej('сижу голодный')
            }
        })
        
        console.log(breakfast);

        const brushYourTeeth = await wraper((res, rej) => {
            if(toothpaste){
                toothpaste = null
                return res('Пора на работу')
            } 
            return rej('нечем чистить зубы')
        })
        console.log(brushYourTeeth);
        console.log('Some moments later', time++);

        const goWork = await wraper((res, rej) => {
            if(time == 8) {
                setTimeout(() => {
                    money = 200
                    return res('поработал.... ПОРА В МАГАЗ')
                }, 1000)
            }else{
                return rej('Опаздал на работу...')
            }
        })
        console.log(goWork);

        const goShop = await wraper((res, rej) => {
            if(money > 100) {
                setTimeout( () => {
                    refrigerator.food = ['apple', 'eggs']
                    toothpaste = true
                    money = 101
                    return res('Надо похавать')
                }, 1000)
            }else{
                return rej(`Нужно больше денег чем - ${money}`)
            }
        })

        console.log(goShop);

        const supper = await wraper((res, rej) => {
            if(refrigerator.food) {
                refrigerator.food = null
                return res('похавал надо, пойти потинятся')
            }
            return rej('сижу голодный')
        })

        console.log(supper);

        const goWander = await wraper((res, rej) => {
            if(money > 100) {
                setTimeout( () => {
                    money = 0
                    return res('Вот и день прошел.........')
                }, 1000)
            }else{
                return rej(`Та ну... Шо делать когда денег - ${money}`)
            }
        })
        console.log(goWander)

    } catch (error) {
        console.error(error)
    }
}

dayZ()