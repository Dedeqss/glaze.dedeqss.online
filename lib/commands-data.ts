export type Command = {
  name: string
  args: string
  desc: string
  category: string
  access: string
}

export const CATEGORIES = [
  "All", "General", "Fun", "Moderation", "Admin", "Ownership", "Panels",
] as const

type Row = [name: string, args: string, desc: string]
const group = (category: Command["category"], access: Command["access"], rows: Row[]): Command[] =>
  rows.map(([name, args, desc]) => ({ name, args, desc, category, access }))

export const COMMANDS: Command[] = [
  ...group("General", "Anyone", [
    ["help", "None", "browse commands by category."],
    ["ping", "None", "show websocket latency."],
    ["roles", "None", "list server roles and member counts."],
    ["whois", "[user]", "show member details, roles, access, and activity."],
    ["profile", "[user]", "show a member's avatar, banner, and account dates."],
    ["avatar", "[user]", "show a user's full-size avatar."],
    ["serverinfo", "None", "show server statistics."],
    ["bosses", "None", "list the server's owners."],
    ["whitelisted", "None", "show the owner, aboveall, and whitelist rosters."],
    ["afk", "[reason]", "set an afk status until your next message."],
    ["timedisconnect", "<duration|cancel>", "schedule or cancel your own voice disconnect. accepts 6h20m1s."],
    ["ticket", "[reason]", "open a private support ticket."],
    ["ticket close", "None", "request closure of your ticket."],
    ["ask", "<question>", "ask the bot about its commands. alias: ai."],
    ["support", "None", "get the support server link."],
    ["oneandonly", "None", "show the bot creator."],
    ["vc cmds", "None", "list all voice channel commands."],
    ["vc create", "[name]", "create a voice channel you own."],
    ["vc claim", "#channel", "claim an unowned voice channel."],
    ["vc status", "[#channel]", "show activity and settings for a managed voice channel."],
    ["vc leaderboard", "None", "rank voice channels by recorded time."],
    ["vc team", "[#channel]", "show a managed voice channel's owner, co-owners, and allow list."],
  ]),

  ...group("Fun", "Anyone", [
    ["gaymeter", "[user]", "show a deterministic rating. alias: howgay."],
    ["simprate", "[user]", "show a deterministic rating. alias: simp."],
    ["iqmeter", "[user]", "show a deterministic score. alias: iq."],
    ["howhot", "[user]", "show a deterministic rating. alias: hot."],
    ["braincells", "[user]", "show a deterministic count."],
    ["pp", "[user]", "show a deterministic size joke."],
    ["vibecheck", "[user]", "show a deterministic vibe rating."],
    ["ship", "<user1> <user2>", "show a compatibility rating. alias: ratelove."],
    ["rate", "<thing>", "rate text from 0 to 100."],
    ["8ball", "<question>", "return a random answer."],
    ["coinflip", "None", "flip a coin. alias: cf."],
    ["roll", "[dice]", "roll dice, for example 2d20. alias: dice."],
    ["choose", "<a | b | c>", "choose one option. alias: pick."],
    ["rps", "<rock|paper|scissors>", "play rock, paper, scissors."],
    ["uwu", "<text>", "transform text into uwu style."],
    ["reverse", "<text>", "reverse text."],
    ["mock", "<text>", "alternate letter case."],
    ["clap", "<text>", "separate words with clap."],
    ["spacify", "<text>", "space out characters. alias: space."],
    ["emojify", "<text>", "convert letters to regional indicator emoji."],
    ["slap", "<user>", "send a slap action."],
    ["hug", "<user>", "send a hug action."],
    ["pat", "<user>", "send a pat action."],
    ["bonk", "<user>", "send a bonk action."],
    ["punch", "<user>", "send a punch action."],
    ["kiss", "<user>", "send a kiss action."],
    ["poke", "<user>", "send a poke action."],
    ["stare", "<user>", "send a stare action."],
    ["yeet", "<user>", "send a yeet action."],
    ["wave", "<user>", "send a wave action."],
    ["cry", "None", "send a cry action."],
    ["dance", "None", "send a dance action."],
  ]),

  ...group("Moderation", "Whitelist+", [
    ["kick", "<user>", "remove a member from the server."],
    ["ban", "<user> [reason]", "ban a member."],
    ["unban", "<user_id>", "remove a ban."],
    ["mute", "<user> <duration>", "time out a member."],
    ["unmute", "<user>", "remove a timeout."],
    ["timeout", "<user> <duration>", "time out a member."],
    ["untimeout", "<user>", "remove a timeout."],
    ["forcemute", "<user>", "keep a member server muted across voice rejoins. alias: fm."],
    ["unforcemute", "<user>", "remove a force mute. alias: ufm."],
    ["forcemuted", "None", "list force muted members."],
    ["forcedeafen", "<user>", "keep a member server deafened. alias: fdn."],
    ["unforcedeafen", "<user>", "remove a force deafen. alias: ufdn."],
    ["forcedeafened", "None", "list force deafened members."],
    ["forcedisconnect", "<user>", "bar a member from voice. aliases: fd, fdc."],
    ["unforcedisconnect", "<user>", "lift a voice ban. aliases: ufd, ufdc."],
    ["vcbanned", "None", "list members barred from voice."],
    ["shush", "<user>", "toggle message deletion for a member."],
    ["handle", "None", "toggle channel handling."],