const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const welcomeChannelName = "✨입사자-명단✨";
const byeChannelName = "🎉퇴사자-명단🎉";
const welcomeChannelComment = "인턴은 롤링에게 찾아가세요.";
const byeChannelComment = "드디어 퇴사하냐?";



client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '도움말을 쳐보세요.' }, status: 'online' })

  let state_list = [
    '도움말을 쳐보세요.',
    '깨어나는 중...',
    '배그 하는 중...',
  ]
  let state_list_index = 1;
  let change_delay = 3000; // 이건 초입니당. 1000이 1초입니당.

  function changeState() {
    setTimeout(() => {
      // console.log( '상태 변경 -> ', state_list[state_list_index] );
      client.user.setPresence({ game: { name: state_list[state_list_index] }, status: 'online' })
      state_list_index += 1;
      if(state_list_index >= state_list.length) {
        state_list_index = 0;
      }
      changeState()
    }, change_delay);
  }

  // changeState();
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '링링아') {
    return message.reply('와 부르노');
  }
  if(message.author.bot) return;
  
  if(message.content == '링링') {
    return message.reply('말이 짧다...?');
  }
  if(message.author.bot) return;

  if(message.content == '어쩌라고'){
    return message.reply('잘못들었습니다...?');
  }
  if(message.author.bot) return;

  if(message.content == '롤링이형'){
    return message.reply('걔 화장실 갔다');
  }
  if(message.author.bot) return;

  if(message.content == '흡하형'){
    return message.reply('안돼 돌아가');
  }
  if(message.author.bot) return;

  if(message.content == '밤비형'){
    return message.reply('밤비형 배그 접었단다');
  }
  if(message.author.bot) return;

  if(message.content == '빙구형'){
    return message.reply('으르르를르르르르르를ㄹㄹㄹ');
  }
  if(message.author.bot) return;

  if(message.content == '롤링 감도'){
    return message.reply('DPI 1400 / 일반, 조준 30 / 수직 0.68 / 스코프 15 / 2배율 22 / 3배율 30 / 4배율 38 / 6배율 45 / 8,15배율 38');
  }
  if(message.author.bot) return;

  if(message.content == '민식이형'){
    return message.reply('개라석이?');
  }


  if(message.content == '롤링') {
    let img = 'https://cdn.discordapp.com/attachments/736914339461726299/741698929145675796/b3740675-2422-44b1-9ae5-9b9bfda57ab1.png';
    let embed = new Discord.RichEmbed()
      .setTitle('롤링')
      .setURL('http://bj.afreecatv.com/jhjun1052')
      .setAuthor('롤링', img, 'http://bj.afreecatv.com/jhjun1052')
      .setThumbnail(img)
      .addBlankField()
      .addField('배그 스트리머', '죠랄 하나는 끝장나는 스트리머')
      .addField('성별', '남자', true)
      .addField('나이', '20대', true)
      .addField('별명', '꽈찌쭈', true)
      .addField('주무기', '베릴\nAKM\nKar98\nM24\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('제작자 롤링', img)

    message.channel.send(embed)
  } else if(message.content == '도움말') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
      {name: '!청소', desc: '텍스트 지움'},
      {name: '!초대코드', desc: '초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('링링 도움말', helpImg)
      .setColor('#186de6')
      .setFooter(`제작자 롤링`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!초대코드') {
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      });
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!전체공지')){}

  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);