/*
* math function
when x>=-r & x<=-r/2:
{
    r^2>=y^2+x^2 & y<=0 & x<=-r/2
}
when x>=-r/2 & x<=0:
{
    r^2>=y^2+x^2 & y<=0 & x<=0 & x>=-r/2
    x>=-r/2 & x<=0 & y>=0 & y<=r
}
when x>=0 & x<=r:
{
    y>=x-r & x>0 & y<0 & y>-r
}
*/

function IsPointInArea(x,y,r){
    if(x>=-r && x<=-r/2){
        if(r**2>=y**2+x**2 && y<=0) return true;
        else return false;
    }
    else if(x>=-r/2 && x<=0){
        if(r**2>=y**2+x**2 && y<=0) return true;
        else if(y>=0 && y<=r) return true;
        else return false;
    }
    else if(x>=0 && x<=-r){
        if(y>=x-r && y<=0 && y>=-r) return true;
        else return false;
    }
    else return false;
}

