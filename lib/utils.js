import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Returns the avatar img src based on the character's name. If the image is not found, returns the Anby one */
export function getAvatarImg(charName){
    const avatarPrefix = 'https://act-webstatic.hoyoverse.com/game_record/zzzv2/role_square_avatar/role_square_avatar_';
    const avatarSuffix = '.png';
    const avatarImgMap = new Map([
        ['Anby', avatarPrefix + '1011' + avatarSuffix],
        ['Soldier 11', avatarPrefix + '1041' + avatarSuffix],
    ]);

    return avatarImgMap.has(charName)? avatarImgMap.get(charName) : avatarImgMap.get('Anby');
}

export function getCharColor(charName){
    const charColorMap = new Map([
        ['Blank', 'rgb(255, 255, 255)'],
        ['Anby', 'rgb(200, 225, 108)'],
        ['Soldier 11', 'rgb(254, 187, 46)'],
        ['Lighter', 'rgb(190, 59, 43)'],
    ]);
  
    return charColorMap.has(charName)? charColorMap.get(charName) : charColorMap.get('Blank');
  }

export function getCharHalfBodyImg(charName){
  const avatarPrefix = 'https://act-webstatic.hoyoverse.com/game_record/zzzv2/role_vertical_painting/role_vertical_painting_';
  const avatarSuffix = '.png';
  const avatarImgMap = new Map([
      ['Anby', avatarPrefix + '1011' + avatarSuffix],
      ['Soldier 11', avatarPrefix + '1041' + avatarSuffix],
      ['Lighter', avatarPrefix + '1161' + avatarSuffix],
  ]);

  return avatarImgMap.has(charName)? avatarImgMap.get(charName) : avatarImgMap.get('Anby');
}

export function getFactionImg(charFaction){
  const avatarPrefix = 'https://act-webstatic.hoyoverse.com/darkmatter/nap/prod_gf_cn/item_icon_';
  const avatarSuffix = '.png';
  const avatarImgMap = new Map([
      ['Cunning Hares', avatarPrefix + 'u072yb/b082a6513bf48b8ad3f09a9549061b80' + avatarSuffix],
      ['Obol Squad', avatarPrefix + 'u072yb/0120cf076ad65b2b128e3e10e32b01d4' + avatarSuffix],
      ['Sons of Calydon', avatarPrefix + 'u44f0b/86eb8e6ba34c0a1743d55cf4087d2dbb' + avatarSuffix],
  ]);

  return avatarImgMap.has(charFaction)? avatarImgMap.get(charFaction) : avatarImgMap.get('Anby');
}

export function getAttributeImg(charAttribute){
  const avatarPrefix = 'https://act.hoyolab.com/app/zzz-game-record/images/attribute-';
  const avatarSuffix = '.png';
  const avatarImgMap = new Map([
      ['eletric', avatarPrefix + 'electric-icon.ad4c441f' + avatarSuffix],
      ['fire', avatarPrefix + 'fire-icon.aeddecee' + avatarSuffix],
  ]);

  return avatarImgMap.has(charAttribute)? avatarImgMap.get(charAttribute) : avatarImgMap.get('Anby');
}

export function getTypeImg(charType){
  const avatarPrefix = 'https://act.hoyolab.com/app/zzz-game-record/images/profession-';
  const avatarSuffix = '.png';
  const avatarImgMap = new Map([
      ['stunner', avatarPrefix + 'breakthrough-icon.84a7f20a' + avatarSuffix],
      ['attacker', avatarPrefix + 'attack-icon.3c2a053f' + avatarSuffix],
  ]);

  return avatarImgMap.has(charType)? avatarImgMap.get(charType) : avatarImgMap.get('Anby');
}