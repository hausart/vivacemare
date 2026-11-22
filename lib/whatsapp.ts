const whatsappNumber = '5513992056715';

export function whatsappHref(subject: string) {
  const message = `Olá! Acessei o site da Vivacemare e gostaria de mais informações sobre ${subject}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
