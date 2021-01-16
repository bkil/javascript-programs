# ÓE-NIK kreditátlag (súlyozott átlag + ösztöndíj kalkulátor)
Az egész projekt arra megy ki, hogy felturbózzam a https://nikhok.hu/osztondij-kalkulator/ oldalon található kalkulátort (és ezt: https://fuggoseg.sth.sze.hu/atlag.html). Ezt majd el fogom küldeni a NIK HÖKösöknek hogy nézzék meg, próbálják ki, és mondjanak róla véleményt. 

Kaptam segítséget szerencsére egy discordos ismerősömtől, úgyhogy próbáltam kiküszöbölni az esetleges problémákat, de a program nagyrészét saját kútfőből vagy éppen netes helpek alapján dobtam össze.

A használati útmutató az benne van a webes appban azaz a html-es fájlban.

Ha azt akarod, hogy működjön, kell hozzá egy webszerver (apache vagy nginx stb.) mert .json fájlt fog a weboldal beolvasni, azokba van benne a tanterv. Két verziót alkottam, a NIK mérnökinfó BSc magyar nappali, és NIK mérnökinfó BSc angol nappali verziót. 

Célom, hogy a diákok sokkal könnyebben tudják kiszámítani az átlagukat. (persze saját tárgyat is tudsz hozzáadni, attól nem kell tartani :))

## English version: ÓE-NIK weighted academic average calculator with stipend index
The whole project is about to oompf the weighted academic average and scholarship/stipend index calculator on https://nikhok.hu/osztondij-kalkulator/  (and this: https://fuggoseg.sth.sze.hu/atlag.html). I will send this to the people from NIK HÖK to check out how it is going and give a feedback on it. 

I got some help from a discord friend so to avoid problems that may occur, but I wrote the major part of the program except there are some stuff from the internet so I can help myself to get my app working.

The user manual is in the web app so in the html file.

If you want it to work, you need a webserver like apache or nginx, because it will read a .json file the website, where the curriculum is. I made two versions: NIK Computer Science Engineering Hungarian and the same in English (because of international students).

My goal is to reach it to the students and calculate the average more easily. (You can add your own subject, not just what it's in the curriculum, don't worry :))

## KÉPEK / IMAGES (dark theme)
Jelenlegi verzió / Current version
![Jelenlegi verzió / Current version](https://files.catbox.moe/esuhf4.png)
Régebbi verzió tantárgyakkal / Older version with subjects
![Régebbi verzió tantárgyakkal / Older version with subjects](https://files.catbox.moe/arh8zw.png)
