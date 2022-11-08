const { Collection } = require("discord.js");
const logger = require("./logger");

module.exports.databasing = databasing;
module.exports.isValidURL = isValidURL;
module.exports.getRandomNum = getRandomNum;
module.exports.onCoolDown = onCoolDown;
module.exports.check_if_dj = check_if_dj;
module.exports.createBar = createBar;
module.exports.delay = delay;
module.exports.duration = duration;
module.exports.escapeRegex = escapeRegex;

function getRandomNum(min, max) {
    try {
        return Math.floor(Math.random() * Math.floor((max - min) + min));
    } catch (e) {
        logger.error(`Something Went Wrong on get random number ${e}`, { label: `getRandomNum Function` });
    }
}

function databasing(client, guildid) {
    if (!client || client == undefined || !client.user || client.user == undefined) return;
    try {
        if (guildid) {
            client.stats.ensure(guildid, {
                commands: 0,
                songs: 0
            });
            client.settings.ensure(guildid, {
                prefix: client.config.prefix,
                defaultvolume: 100,
                defaultautoplay: true,
                nsfw: false,
                djroles: [],
                botchannel: [],
            });
        }
        return;
    } catch (e) {
        logger.error(`Something Went Wrong on databasing ${e}`, { label: `databasing Function` });
    }
}

function isValidURL(string) {
    const args = string.split(" ");
    let url;
    for (const arg of args) {
        try {
            url = new URL(arg);
            url = url.protocol === "http:" || url.protocol === "https:";
            break;
        } catch (_) {
            url = false;
        }
    }
    return url;
};

function onCoolDown(message, command) {
    if (!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
    if (!command || !command.name) throw "No Command with a valid Name granted as Second Parameter";
    const client = message.client;
    if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
        client.cooldowns.set(command.name, new Collection());
    }
    const now = Date.now(); //get the current time
    const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
    const cooldownAmount = (command.cooldown || 5) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
    if (timestamps.has(message.member.id)) { //if the user is on cooldown
        const expirationTime = timestamps.get(message.member.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
        if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            //return true
            return timeLeft
        }
        else {
            //if he is not on cooldown, set it to the cooldown
            timestamps.set(message.member.id, now);
            //set a timeout function with the cooldown, so it gets deleted later on again
            setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
            //return false aka not on cooldown
            return false;
        }
    }
    else {
        //if he is not on cooldown, set it to the cooldown
        timestamps.set(message.member.id, now);
        //set a timeout function with the cooldown, so it gets deleted later on again
        setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
        //return false aka not on cooldown
        return false;
    }
}

function check_if_dj(client, member, song) {
    //if no message added return
    if (!client) return false;
    //get the adminroles
    var roleid = client.settings.get(member.guild.id, `djroles`)
    //if no dj roles return false, so that it continues
    if (String(roleid) == "") return false;

    //define variables
    var isdj = false;

    //loop through the roles
    for (let i = 0; i < roleid.length; i++) {
        //if the role does not exist, then skip this current loop run
        if (!member.guild.roles.cache.get(roleid[i])) continue;
        //if he has role set var to true
        if (member.roles.cache.has(roleid[i])) isdj = true;
        //add the role to the string
    }
    //if no dj and not an admin, return the string
    if (!isdj && !member.permissions.has(PermissionsBitField.Flags.Administrator) && song.user.id != member.id)
        return roleid.map(i => `<@&${i}>`).join(", ");
    //if he is a dj or admin, then return false, which will continue the cmd
    else
        return false;
}

function createBar(total, current, size = 25, line = "▬", slider = "🔷") {
    try {
        if (!total) throw "MISSING MAX TIME";
        if (!current) return `**[${slider}${line.repeat(size - 1)}]**`;
        let bar = current > total
            ? [line.repeat(size / 2 * 2), (current / total) * 100]
            : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider)
                + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar).includes(slider)) {
            return `**[${slider}${line.repeat(size - 1)}]**`;
        } else {
            return `**[${bar[0]}]**`;
        }
    } catch (e) {
        logger.error(`Something Went Wrong on creating bar ${e}`, { label: `createBar Function` });
    }
}

function delay(delayInms) {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    } catch (e) {
        logger.error(`Something Went Wrong on delay ${e}`, { label: `delay Function` });
    }
}

function duration(duration, useMilli = false) {
    let remain = duration;
    let days = Math.floor(remain / (1000 * 60 * 60 * 24));
    remain = remain % (1000 * 60 * 60 * 24);
    let hours = Math.floor(remain / (1000 * 60 * 60));
    remain = remain % (1000 * 60 * 60);
    let minutes = Math.floor(remain / (1000 * 60));
    remain = remain % (1000 * 60);
    let seconds = Math.floor(remain / (1000));
    remain = remain % (1000);
    let milliseconds = remain;
    let time = {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
    };
    let parts = []
    if (time.days) {
        let ret = time.days + ' Day'
        if (time.days !== 1) {
            ret += 's'
        }
        parts.push(ret)
    }
    if (time.hours) {
        let ret = time.hours + ' Hr'
        if (time.hours !== 1) {
            ret += 's'
        }
        parts.push(ret)
    }
    if (time.minutes) {
        let ret = time.minutes + ' Min'
        if (time.minutes !== 1) {
            ret += 's'
        }
        parts.push(ret)

    }
    if (time.seconds) {
        let ret = time.seconds + ' Sec'
        if (time.seconds !== 1) {
            ret += 's'
        }
        parts.push(ret)
    }
    if (useMilli && time.milliseconds) {
        let ret = time.milliseconds + ' ms'
        parts.push(ret)
    }
    if (parts.length === 0) {
        return ['instantly']
    } else {
        return parts
    }
}

function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch {
        return str
    }
}