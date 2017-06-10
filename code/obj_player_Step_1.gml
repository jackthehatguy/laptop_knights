depth = -x-y;

// get input
key_right = keyboard_check(vk_right); // ord("D")
key_left = -keyboard_check(vk_left);
key_down = keyboard_check(vk_down);
key_up = -keyboard_check(vk_up);

// react input
hmove = key_left + key_right;
hsp = hmove * movespeed;

vmove = key_up + key_down;
vsp = vmove * movespeed;

// horizontal collision
if(place_meeting(x+hsp,y,obj_wall)) {
  while(!place_meeting(x+sign(hsp),y,obj_wall)) {
    x += sign(hsp);
  }
  hsp = 0;
}
x += hsp;

// vertical collision
if(place_meeting(x,y+vsp,obj_wall)) {
  while(!place_meeting(x,y+sign(vsp),obj_wall)) {
    y += sign(vsp);
  }
  vsp = 0;
}
y += vsp;
