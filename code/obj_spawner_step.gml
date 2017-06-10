if(mouse_check_button_released(mb_left)) {
  var str = "";
  switch(irandom(4)) {
    case 0: str = "I think I think, therefore I think I am"; break;
    case 1: str = "Would you kindly"; break;
    case 2: str = "Twas brillig and the slithy toves#didgyre and gimble in the wabe#all mimsy were the borrowgroves#and the momeraths outgrabe"; break;
    case 3: str = "This is a haiku#watch the syllables it has#five seven and five"; break;
    case 4: str = "I will not eat green eggs and ham#I do not like them Sam I Am"; break;
    default: str = "NOOOOOOOOOOOOOOOooooooooooooooooOOOOOOOOOOOOOOOOooooooooooOOOOOOOoooooooooo"; break;
  }
  scr_text(str,0.8,mouse_x,mouse_y);
}
