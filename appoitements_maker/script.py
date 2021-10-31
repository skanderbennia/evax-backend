from datetime import datetime, timedelta
import sys


date_1 = sys.argv[1].split("/")
date_1 = [int(item) for item in date_1]

date_2 = sys.argv[2].split("/")
date_2 = [int(item) for item in date_2]

time_1 = sys.argv[3].split(":")
time_1 = [int(item) for item in time_1]

time_2 = sys.argv[4].split(":")
time_2 = [int(item) for item in time_2]

s_date = datetime(date_1[2], date_1[1], date_1[0], time_1[0], time_1[1], time_1[2])
e_date = datetime(date_2[2], date_2[1], date_2[0], time_2[0], time_2[1], time_2[2])


#10 mintues
#interval = sys.argv[5] * 60 ["10"]
intervall = sys.argv[5]

interval_time = timedelta(seconds=int(intervall)*60)

center_capacity = sys.argv[6]

times = []
while s_date < e_date:
  for i in range(0,int(center_capacity)):
    times.append(s_date.strftime('%d/%m/%y %H:%M:%S'))
  s_date += interval_time

print(times)
