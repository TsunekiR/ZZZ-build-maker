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

export function getCharHalfBodyImg(charName){
  const avatarPrefix = 'https://act-webstatic.hoyoverse.com/game_record/zzzv2/role_vertical_painting/role_vertical_painting_';
  const avatarSuffix = '.png';
  const avatarImgMap = new Map([
      ['Anby', avatarPrefix + '1011' + avatarSuffix],
      ['Soldier 11', avatarPrefix + '1041' + avatarSuffix],
  ]);

  return avatarImgMap.has(charName)? avatarImgMap.get(charName) : avatarImgMap.get('Anby');
}

export function getFactionImg(charFaction){
  const avatarPrefix = 'https://act-webstatic.hoyoverse.com/darkmatter/nap/prod_gf_cn/item_icon_u072yb/';
  const avatarSuffix = '.png';
  const avatarImgMap = new Map([
      ['Cunning Hares', avatarPrefix + 'b082a6513bf48b8ad3f09a9549061b80' + avatarSuffix],
      ['Obol Squad', avatarPrefix + '0120cf076ad65b2b128e3e10e32b01d4' + avatarSuffix],
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