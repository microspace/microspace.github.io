const LANG = document.getElementsByTagName('html')[0].getAttribute('lang');


function get_l10n(game, message) {
    let translated = l10n[game][message][LANG]

    return translated
}
const l10n = {
    common: {
        "next": {
            en: "Next!",
            ru: "Вперёд!"
        },
        "reset": {
            en: "Reset",
            ru: "Сбросить"
        },
        "start": {
            en: "Run",
            ru: "Запуск"
        },
    },
    "blocks": {
        "up": {
            en: "Up",
            ru: "Вверх"
        },
        "down": {
            en: "Down",
            ru: "Вниз"
        },
        "left": {
            en: "Left",
            ru: "Влево"
        },
        "right": {
            en: "Right",
            ru: "Вправо"
        },
        "turn": {
            en: "turn around",
            ru: "разворот"
        },
        "fillup": {
            en: "fill up",
            ru: "засыпать"
        },
        "icehole": {
            en: "ice hole",
            ru: "полынья"
        },
        "fire": {
            en: "Fire!",
            ru: "Огонь!"
        },
        "press": {
            en: "Press",
            ru: "Нажмите"
        },
        "to_launch": {
            en: "to run",
            ru: "для запуска"
        },
        "float": {
            en: "Float %1 seconds to x:%2 y:%3",
            ru: "Плыть %1 секунду в точку x:%2 y:%3"
        },
        "changeskin": {
            en: 'change sprite to %1',
            ru: 'сменить костюм на %1'
        },
        "changex": {
            en: 'Change x by %1',
            ru: 'Изменить х на %1'
        },
        "changey": {
            en: 'Change y by %1',
            ru: 'Изменить y на %1'
        },
        "build": {
            en: 'Build',
            ru: 'Построить'
        },
        "setx": {
            en: 'Set x to %1',
            ru: 'Установить x в %1'
        },
        "sety": {
            en: 'Set y to %1',
            ru: 'Установить y в %1'
        },
        "setxy": {
            en: 'Set х to %1, у to %2',
            ru: 'Перейти в х: %1 у: %2'
        },
        "repeat": {
            en: 'Repeat %1 times',
            ru: 'Повтори %1 раз'
        },
        "times": {
            en: 'do %1',
            ru: "выполнить %1"
        },
        "uturn": {
            en: 'Turn around',
            ru: 'Разворот'
        },
        "obstacle": {
            en: 'Ice hole %1',
            ru: "%1 полынья"
        },
        "fill_the_pit": {
            en: 'Fill up %1',
            ru: 'засыпать %1'
        },
        "if_block": {
            en: 'if %1 do %2',
            ru: "если %1 выполнить %2"
        },
        "pickup": {
            en: 'Pick up',
            ru: 'Поднять'
        },

        "onright": {
            en: 'on the right',
            ru: "справа"
        },
        "onleft": {
            en: 'on the left',
            ru: 'слева'
        },
        "above": {
            en: 'above',
            ru: "сверху"
        },
        "below": {
            en: 'below',
            ru: 'снизу'
        },
    },
    "game0": {
        "start": {
            en: "Hi! You need to reach a meeting point. Operate the robotic suit via blocks and reach the signs. Use the arrow keys to view the map.",
            ru: "Привет! Ты должен дойти до пункта сбора. Управляй робокостюмом с помощью блоков и добирайся до указателей. Используй стрелки на клавиатуре для просмотра карты.",
        },
        "m2": {
            en: "Good job! Now try to reach the next sign!",
            ru: "Отлично получилось! Теперь попробуй дойди до следующего указателя!",
        },
        "m3": {
            en: "Excellent! Press the button to fix the bridge!",
            ru: "Превосходно! Нажми на кнопку, чтобы восстановить мост!",
        },
        "m4": {
            en: "Now you need to reach the big gate but it’s closed. You need to take a key to open it!",
            ru: "Теперь нужно дойти до больших ворот, но они закрыты. Чтобы их открыть нужно взять ключ!",
        },
        "win": {
            en: "Excellent! Everyone is here! Now we will fly into space! You will have a training battle vs our robots.",
            ru: "Отлично! Все в сборе! Теперь мы летим в космос! Там вас ждет учебный бой против наших роботов."
        }
    },
    "game1": {

        "start": {
            en: "Hi! I will teach you to operate your robotic suit. First of all, try to move!",
            ru: "Привет! Я научу тебя пользоваться твоим робокостюмом. Для начала попробуй просто сдвинуться с места!"
        },
        "m2": {
            en: "Good job! Now try to reach the end of the corridor!",
            ru: "Отлично получилось! Теперь попробуй дойди до конца коридора!"
        },
        "m3": {
            en: "Great! Now reach those barrels!",
            ru: "Превосходно! Сейчас надо дойти до тех бочек!"
        },
        "m4": {
            en: "These barrels block your way. Shoot them to go ahead!",
            ru: "Эти бочки преградили тебе путь. Расстреляй их, чтобы пройти дальше!"
        },
        "m5": {
            en: "Now you need to find and shoot 5 barrels with targets. Don’t shoot barrels of water. Use arrow keys to move the map and look for targets.",
            ru: "А теперь нужно найти и подстрелить 5 бочек с мишенями. Нельзя стрелять по бочкам с водой. Используй стрелочки, чтобы двигать карту и искать цели."
        },
        "fail": {
            en: "You haven’t shot all the barrels you need!",
            ru: "Ты подстрелил не все нужные бочки!"
        },
        "fail_water": {
            en: "You mustn’t shoot barrels of water! Aim precisely!",
            ru: "Нельзя стрелять по бочкам с водой! Целься точнее!"
        },
        "win": {
            en: "Congratulations! Now you know how to operate your robotic suit!",
            ru: "Поздравляю! Ты научился пользоваться робокостюмом!"
        },
    },
    "game2": {
        "start": {
            en: "Cadet, you need to collect all the chests of gold. Operate your robotic suit with your Galactic reference frame.",
            ru: "Кадет, тебе нужно собрать все сундуки с золотом. Управляй робокостюмом с помощью Галактической системы координат.",
        },
        "fail": {
            en: "You haven’t collected all the chests of gold!",
            ru: "Ты подобрал не все сундуки!",
        },
        "win": {
            en: "Congratulations! You are good at the Galactic reference frame!",
            ru: "Поздравляю! Ты отлично разбираешься в Галактической системе координат!"
        }

    },
    "game3": {
        "start": {
            en: "Now you need to finish constructing the missing part of the map.",
            ru: "На этом этапе необходимо достроить недостающую часть карты.",
        },
        "win": {
            en: "Good job! All the ruins have been explored!",
            ru: "Ты отлично справился! Теперь все руины исследованы!"
        }
    },
    "game4": {
        "start": {
            en: "Who is here?!! You have just graduated from the bootcamp of the training base! First, prove that you can shoot!",
            ru: "И кого за нами прислали?!! Вы совсем недавно учебку закончили! Сначала докажите нам, что умеете стрелять!",
        },

        "m2": {
            en: "I knew it! Every bullet and every energy cell matter during dangerous missions! They didn’t teach you how to use «Repeat» command in a bootcamp, did they?!",
            ru: "Я так и знал! На опасных заданиях каждый патрон, каждая энергетическая ячейка на счету! Вас что в учебке не учили использовать команду «Повтори»?!",
        },

        "m3": {
            en: "You need to train more. Shoot these barrels.",
            ru: "Тебе нужно потренироваться еще больше. Подстрели вот эти бочки.",
        },

        "m4": {
            en: "You are doing great! Now I see why they entrusted you with this important task!",
            ru: "Отлично справляешься! Теперь я понимаю, почему тебе доверили такое важное задание!",
        },

        "m5": {
            en: "We are almost done! Here is a new test for you.",
            ru: "Мы почти закончили! Для тебя новое испытание.",
        },

        "m6": {
            en: "Hey! You have coped with everything! And now your final task! If you can cross over the canyon and shoot those barrels, I will let you convoy the information about Agnosto!",
            ru: "Ха! Да вы со всем справились! А теперь последнее испытание! Если сможете пересечь ущелье и подстрелить те бочки, я разрешу вам сопровождать информацию об Агносто!",
        },
        "win": {
            en: "Now I see why they have sent you! You turned out to be very skillful rangers! You will be able to protect the information about Agnosto!",
            ru: "Теперь я понял, почему отправили именно вас! Вы оказались очень умелыми рейнджерами! Вы легко сможете защитить информацию об Агносто!"
        },


    },
    "game5": {
        "m1": {
            en: "Look for signs in the fog that the missing group has left.",
            ru: "Каждый раз ищи в тумане указатели, которые оставила пропавшая группа.",
        },

        "m2": {
            en: "Dead bodies are all around. What happened here? I hope that the group is all right.",
            ru: "Тут повсюду трупы. Что тут произошло? Надеюсь с отрядом все в порядке.",
        },

        "m3": {
            en: "Finally, the help is here! We have found traces of Agnosto, but we were attacked by the animals that woke up because of the warming. One ranger went to prepare an evacuation point and disappeared. Go find him!",
            ru: "Наконец-то пришла помощь! Мы нашли следы Агносто, но нас атаковали животные, которые проснулись из-за потепления. Один боец отправился подготовить точку эвакуации и пропал. Найдите его!",
        },
        "m4": {
            en: "And here is our missing ranger! The evacuation point is on the other bank of the river but the bridge is washed out! Fill the bridge and prepare the evacuation point, while your partner covers you!",
            ru: "А вот и пропавший рейнджер! Оказывается точка эвакуации на другом берегу, а мост размыт! Засыпьте мост и подготовьте точку эвакуации, пока напарник вас прикрывает!",
        },
        "fail": {
            en: "You need to fill in all the blocks of the bridge.",
            ru: "Нужно засыпать все блоки на мосту",
        },

        "win": {
            en: "Congratulations! You have fixed the bridge and reached the evacuation point. Now we can fly back home!",
            ru: "Ура! Ты починил мост и подготовил точку эвакуации! Теперь мы можем лететь домой!"
        },

    }
}