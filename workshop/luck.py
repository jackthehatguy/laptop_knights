import random

i = 1
run = "x"
#`stat stat chance`
level = 1
char_name = input("What is the character's name?\n")
file_object = open(char_name+"_stats.txt", "a+")
run = "y"
statlist = ["Health", "Attack", "Magic", "Defense", "Speed", "Luck" ]

while run == "y" or run == "Y":
    for stat_name in statlist:
        print(stat_name)
        file_object.write(stat_name.capitalize()+"\n")
        if stat_name == "Health" or stat_name == "health" or stat_name == "hp":
            stat_start = input("What is the base value of the stat\n")
            file_object.write(str(level)+": "+str(stat_start)+"\n")
            stat_start = int(stat_start)
            stat_prof = 1
        else:
            stat_prof = input("What is the value of the stat prof 1/0/-1? -1 is weak, 0 is neutral, and 1 is proficient.\n")
            while stat_prof != "-1" and stat_prof != "0" and stat_prof != "1":
                print ("not valid, try again")
                print(stat_prof)
                stat_prof=input()
            stat_prof = int(stat_prof)  # `So that it doesnt shit itself trying to read text as a number`
            stat_start = input("What is the base value of the stat\n")
            stat_start = int(stat_start)
        # print (stat_name,char_name)
        while level < 51: # `so it will stop for level 50`
            file_object.write(str(level)+": "+str(stat_start)+"\n")
            Set_1 = random.choice([0,1,2,2]) #`these x and y are so I can get the 1.3 ratio I need cause they average to 1.4 and 1.2 respectively`
            Set_2 = random.choice([0,1,1,2,2])
            Set_3 = random.choice([1,2,3])
            if stat_prof > 0: # `has stat prof`
                stat_start += random.choice([Set_1,Set_2,Set_3])
            elif stat_prof < 0: # `has negative stat`
                stat_start += random.choice([0,1,1]) #`so not as high chance to get non-0 value (1/3 compared to 1/6)`
            else: # `has normal stat`
                stat_start += random.choice([Set_1,Set_2])
            print("level",level,":",stat_start)
            level += 1 #`adds level for chart`
        # print("level",level,":",stat_start)
        # file_path = input("Path to output file: ")
        print('\n')
        file_object.write('\n')
        level = 1
        stat_start = 1
        file_object.close()
        file_object = open(char_name+"_stats.txt", "a+")
    run = input("Do you want to run again? (y/n): ")
    # print(run)
    while run != "y" and run != "Y" and run != "n" and run != "N":
        run = input("Do you want to run again? (y/n): ")
file_object.close()
