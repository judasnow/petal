#! /bin/bash   
res_path="/home/www/petal/client"  
mem_path="/dev/shm/petal_client"  
lk_path="/home/www/petal_client"  
 
if [ ! -d "$mem_path" ]; then  
    cp -r "$res_path" "$mem_path"  
fi  
 
if [ ! -L "$lk_path" ]; then  
    ln -s "$mem_path" "$lk_path"  
fi
