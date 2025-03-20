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

export function getCharFullBodyImg(charName){
  const avatarPrefix = 'https://act-webstatic.hoyoverse.com/game_record/zzzv2/role_vertical_painting/role_vertical_painting_';
  const avatarSuffix = '.png';
  const avatarImgMap = new Map([
      ['Anby', avatarPrefix + '1011' + avatarSuffix],
      ['Soldier 11', avatarPrefix + '1041' + avatarSuffix],
  ]);

  return avatarImgMap.has(charName)? avatarImgMap.get(charName) : avatarImgMap.get('Anby');
}