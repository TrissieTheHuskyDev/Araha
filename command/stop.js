const Model = require('./model')
const SmallRichEmbed = require('../utils/embed.js')

module.exports = class Stop extends Model {
  constructor () {
    super({
      cmds: ['stop', '정지'],
      description: 'cmd_stop_desc',
      category: 'category_music',
      commandname: 'cmd_stop',
      isownercmd: false,
      voiceChannel: true
    })
  }

  async run (pkg) {
    const Embed = new SmallRichEmbed()
    const player = pkg.client.m.get(pkg.msg.guild.id)
    const { queue } = player

    if (this.voiceChannel && !pkg.msg.member.voiceChannel) {
      Embed.addField(pkg.lang.get('cmd_warning'), pkg.lang.get('use_in_voice'))
      Embed.setColor(14217046)
      return pkg.msg.channel.send(Embed.get())
    }

    if (!player.connection || queue.isLast) {
      Embed.addField(
        pkg.lang.get('cmd_warning'),
        pkg.lang.get('no_music_playing')
      )
      Embed.setColor(14217046)
      return pkg.msg.channel.send(Embed.get())
    }

    player.loop = false
    player.loopQueue = false
    player.stop()

    Embed.addField(pkg.lang.get('cmd_success'), pkg.lang.get('stopped'))
    pkg.msg.channel.send(Embed.get())
  }
}
