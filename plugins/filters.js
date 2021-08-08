/* Copyright (C) 2020 ameer-kallumthodi.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/
const fs = require('fs')
const Asena = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const Config = require('../config')
const jid = Config.DISBGM != false ? Config.DISBGM.split(',') : [];
const Language = require('../language');
const Lang = Language.getString('filters');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false }, (async (message, match) => {
    if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919946432377@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/Mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = [.'mp3','Aaumb','Ada','Ara','song','Adhaonum','baby I love you','Endh akan','Delete for everyone','chat whatsapp','Endhan','kosandra','Halo','ishttayi','Kumbi','Poli','night','Myr','Porotta','polikum','Thayoli','umbiko','Xxx','Umfiko','Avane','Chelakand','Kannapi','Nayinte','Myre','Poweresh','Power','pulle','Seen','Set ak','thot','thottu','thug','Thyr','Town','Track maat','trance','Uff','Umbi','umma','uyir','Va','Vaa','vada','alive','Aliya','Aliyo','alone','ano','ara','Ardra','ayilla','ayn','aysheri','Ayyo','baby','Back','bad boy','Bad','bgm','Bhasi','bie','big fan','Blackzue','Boss','bot','broken','brokenlove','Bye','care','chatho','Chathy','Chetta','Chiri','Chunk','chunke','chunks','comedy','cr7','Cristiano','Cry','da','Dai','DD','die','Dora','Eda','ee','ekk','Ellarum ede','ennitt','enth','Entha cheyya','entha','Enthada','evde','Fan','fd','Feel aayi','Fek','ff','free','fresh','Frnd','Fsq','Gd mng','gd n8','Gd ngt','gdmng','gdngt','good bye','group','grp','Ha','hate','Haters','Hbd','Hbday','He','Hello','Hi','Hlo','Hloo','Hoi','Hy','i am back','ijathi','jd','kadhal','kali','Kanaran','Kanjan','Kanjav','Kemam','kerivaa','Kevin','Kgf','killadi','king','kiss','Kk','Koi','kozhi','Kukku','kundan','Kunju','kunna','Kurup','Kutty','La','Lala','left','opucha','life','line','Lo','Loo','Love tune','love u','Love','lover','Loveu','Lub u','lucifer','machan','Mad','Malang','mindalle','mindathe','Mohanlal','Mood','moodesh','moonji','music','Muth','muthe','my area','My love','mybos','mylove','myr','myre','Nalla kutty','Nallakutti','nallath','Name entha','Name','nanban','Nanbiye','Nanni','neymar','Neymer','Nirtheda','njan','Njn vera','njn','Njr','noob','Oh no','Oh','ok bei','Ok bye','ok da','ok','oombi','oompi','over','Paat','paatt','Paavam','padicho','pani','Panni','parayatte','patti','perfect ok','Pever','pewer','photo','Pikachu','Pinnallah','Place','Poda','Podai','Poli','polika','Pooda','poora','Poote','Pora','Potta','Potte','Power varate','power','Poweresh','Poyeda','Pranayam','Psycho','rashmika','sad','Sahva','saji','scene','Sed aayi','sed bgm','sed','Serious','set aano','Set','Seth po','single','sis','sketched','Smile','sneham','song','sorry','Sry','Subscribe','Suhail','sulthan','Super','T','thall','thamasha','Thantha','thayoli','theri','Veeran','venda','verithanam','Vidhi','Wait','waiting','welcome','why','wow','2','aara','Aarulle','adi','Adipoli','breakup','Chunks','Clg','dance','Di','don','Ee','enjoy','Fen','Gd','Hacker','help','I love you','Kali','Kk','KL LUTTAP 007','Kl luttapi 007','kozhi','love','Men','Mm','myr','Myre','Nanbaa','nanban','Nirth','Njan vannu','Njan','No love','paatt','Penn','Pinnalla','poda','Pooda','prandh','putt','Rashmika','rip','Sarassu','Sarasu','Sed','Set aaka','Sfi','Single','sopnam','Tholvi','Uyr','Waiting','wcm']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
else if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919946432377@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/Mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = [.'mp3','Aaumb','Ada','Ara','Adhaonum','baby I love you','Endh akan','Delete for everyone','chat whatsapp','Endhan','kosandra','Halo','ishttayi','Kumbi','Poli','night','Myr','Porotta','polikum','Thayoli','umbiko','Xxx','Umfiko','Avane','Chelakand','Kannapi','Nayinte','Myre','Poweresh','Power','pulle','Seen','Set ak','thot','thottu','thug','Thyr','Town','Track maat','trance','Uff','Umbi','umma','uyir','Va','Vaa','vada','alive','Aliya','Aliyo','alone','ano','ara','Ardra','ayilla','ayn','aysheri','Ayyo','baby','Back','bad boy','Bad','bgm','Bhasi','bie','big fan','Blackzue','Boss','bot','broken','brokenlove','Bye','care','chatho','Chathy','Chetta','Chiri','Chunk','chunke','chunks','comedy','cr7','Cristiano','Cry','da','Dai','DD','die','Dora','Eda','ee','ekk','Ellarum ede','ennitt','enth','Entha cheyya','entha','Enthada','evde','Fan','fd','Feel aayi','Fek','ff','free','fresh','Frnd','Fsq','Gd mng','gd n8','Gd ngt','gdmng','gdngt','good bye','group','grp','Ha','hate','Haters','Hbd','Hbday','He','Hello','Hi','Hlo','Hloo','Hoi','Hy','i am back','ijathi','jd','kadhal','kali','Kanaran','Kanjan','Kanjav','Kemam','kerivaa','Kevin','Kgf','killadi','king','kiss','Kk','Koi','kozhi','Kukku','kundan','Kunju','kunna','Kurup','Kutty','La','Lala','left','opucha','life','line','Lo','Loo','Love tune','love u','Love','lover','Loveu','Lub u','lucifer','machan','Mad','Malang','mindalle','mindathe','Mohanlal','Mood','moodesh','moonji','music','Muth','muthe','my area','My love','mybos','mylove','myr','myre','Nalla kutty','Nallakutti','nallath','Name entha','Name','nanban','Nanbiye','Nanni','neymar','Neymer','Nirtheda','njan','Njn vera','njn','Njr','noob','Oh no','Oh','ok bei','Ok bye','ok da','ok','oombi','oompi','over','Paat','paatt','Paavam','padicho','pani','Panni','parayatte','patti','perfect ok','Pever','pewer','photo','Pikachu','Pinnallah','Place','Poda','Podai','Poli','polika','Pooda','poora','Poote','Pora','Potta','Potte','Power varate','power','Poweresh','Poyeda','Pranayam','Psycho','rashmika','sad','Sahva','saji','scene','Sed aayi','sed bgm','sed','Serious','set aano','Set','Seth po','single','song','sketched','Smile','sneham','song','sorry','Sry','Subscribe','Suhail','sulthan','Super','T','thall','thamasha','Thantha','thayoli','theri','Veeran','venda','verithanam','Vidhi','Wait','waiting','welcome','why','wow','2','aara','Aarulle','adi','Adipoli','breakup','Chunks','Clg','dance','Di','don','Ee','enjoy','Fen','Gd','Hacker','help','I love you','Kali','Kk','KL LUTTAP 007','Kl luttapi 007','kozhi','love','Men','Mm','myr','Myre','Nanbaa','nanban','Nirth','Njan vannu','Njan','No love','paatt','Penn','Pinnalla','poda','Pooda','prandh','putt','Rashmika','rip','Sarassu','Sarasu','Sed','Set aaka','Sfi','Single','sopnam','Tholvi','Uyr','Waiting','wcm']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    if(Config.AUTOSTICKER){
    let banned = jid.find( Jid => Jid === message.jid);
    if(banned !== undefined) return
    if (!!message.mention && message.mention[0] == '919946432377@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/song.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})
    }
const array = ['Pikachu','Msd','Vijay','Rashmika','song','Sry','Line','Aarulle','achodaa','ayin','Aysheri','Ayye','Ayyo','broken','bye','chattho','cute','Da','Eee','Eee2','engane und','Entha','Enthada','Girls','Good morning','Good night','Hi','Hy','ithokke enth','ivan','Kurippe','Kurumb','Love','Mm','naanam','nadakkatte','Ok','paavam','Pattumo','pikachu','Pm','poda','Pova','Save','Sed','song','sho','Shoo','Smile','tag','Udayipp','umma','Vaa','Vannu','yo','ys','Aaumb','Ada','Ara','Adhaonum','baby I love you','Endh','Endhan','kosandra','Halo','ishttayi','Kumbi','Poli','night','Myr','Porotta','polikum','Thayoli','umbiko','Xxx','Umfiko','Avane','Chelakand','Kannapi','Nayinte','Myre','Poweresh','Power','pulle','Seen','Aaumb','Ada','Ara','Adhaonum','baby I love you','Endh akan','Delete for everyone','Endhan','kosandra','Halo','ishttayi','Kumbi','Poli','night','Myr','Porotta','polikum','Thayoli','umbiko','Xxx','Umfiko','Avane','Chelakand','Kannapi','Nayinte','Myre','Poweresh','Power','pulle','Seen','Set ak','chat whatsapp']

let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
   await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})
}
});
}

var filtreler = await FilterDb.getFilter(message.jid);
if (!filtreler) return; 
filtreler.map(
    async (filter) => {
        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
        if (pattern.test(message.message)) {
            await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
        }
    }
);
}));
}
