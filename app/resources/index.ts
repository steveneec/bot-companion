import {funcType} from '../types';

export const fonts = {
  regular: 'PlusJakartaSans-Regular',
  light: 'PlusJakartaSans-Light',
  medium: 'PlusJakartaSans-Medium',
  semibold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
};

export const colors = [
  '#ef5350',
  '#ec407a',
  '#ab47bc',
  '#7e57c2',
  '#5c6bc0',
  '#42a5f5',
  '#29b6f6',
  '#26c6da',
  '#26a69a',
];

export const apiBase = 'http://192.168.100.21:3000';

export const mainOptions: funcType[] = [
  {
    _id: 'playMusic',
    action: 'Reproduce música',
    icon: 'musical-notes-outline',
    color: '#5C4B99',
    goTo: 'Function',
    description: 'Reproduce música facilmente con BMO',
    command: ['Reproduce', 'Pon'],
    example: [
      'Reproduce Snow Hey Oh de Red Hot Chilli Peppers',
      'Pon Big Bang de Cami',
    ],
  },
  {
    _id: 'playVideo',
    action: 'Reproduce videos',
    icon: 'play-circle-outline',
    color: '#EA1179',
    goTo: 'Function',
    description: 'Reproduce videos facilmente con BMO',
    command: ['Pon un video', 'Quiero ver el video de'],
    example: [
      'Pon un video de las mejores jugadas de Messi',
      'Quiero ver el video de The Seed de Aurora',
    ],
  },
  /*{
    _id: '__',
    action: 'Preguntale a Chat GPT',
    icon: 'chatbox-ellipses-outline',
    color: '#22A699',
    goTo: 'Function',
    description: 'Reproduce musica facilmente con BMO',
    command: ['Reproduce', 'Pon'],
    example: [
      'Reproduce Snow Hey Oh de Red Hot Chilli Peppers',
      'Pon Big Bang de Cami',
    ],
  },
  {
    _id: '__',
    action: 'Busca en internet',
    icon: 'earth-outline',
    color: '#F79327',
    goTo: 'Function',
    description: 'Reproduce musica facilmente con BMO',
    command: ['Reproduce', 'Pon'],
    example: [
      'Reproduce Snow Hey Oh de Red Hot Chilli Peppers',
      'Pon Big Bang de Cami',
    ],
  },*/
  {
    _id: '__',
    action: 'Preguntas de un texto o PDF',
    icon: 'reader-outline',
    color: '#0B2447',
    goTo: 'Function',
    description: 'Reproduce musica facilmente con BMO',
    command: ['Reproduce', 'Pon'],
    example: [
      'Reproduce Snow Hey Oh de Red Hot Chilli Peppers',
      'Pon Big Bang de Cami',
    ],
    extraConfig: true,
    goToExtraConfig: 'ChatPDFSettings',
    noConfigFoundMessage:
      'No has proporcionado un texto o PDF. Ve a configuraciones y agrega un texto o sube un PDF',
    configFoundMessage: 'Genial, ya puedes hacer tus preguntas!',
  },
  {
    _id: '__',
    action: 'Consulta el clima',
    icon: 'rainy-outline',
    color: '#19A7CE',
    goTo: 'Function',
    description: 'Reproduce musica facilmente con BMO',
    command: ['Reproduce', 'Pon'],
    example: [
      'Reproduce Snow Hey Oh de Red Hot Chilli Peppers',
      'Pon Big Bang de Cami',
    ],
  },
  {
    _id: 'sendEmail',
    action: 'Envía e-mails usando GMAIL',
    icon: 'mail-outline',
    color: '#ef5350',
    goTo: 'Function',
    description: 'Envía e-mails facilmente con BMO',
    command: ['Envia un correo', 'Escribe un correo'],
    example: [
      'Envia un correo a Francisco con el asunto Hola y el mensaje Hola Francisco, te envío este mensaje usando BMO PetBot',
      'Escribe un correo para Damian con el asunto Hey amigo y el mensaje Hey amigo, te saludo desde Argentina',
    ],
    extraConfig: true,
    goToExtraConfig: 'EmailSettings',
    noConfigFoundMessage:
      'Para acceder a esta función primero debes configurar el servicio de GMAIL',
    configFoundMessage:
      'Perfecto, ya pudes enviar e-mails, recuerda tus agregar contactos!',
  },
];
