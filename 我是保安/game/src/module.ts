/*
* 方法集合
*/
class module {
    /**
     * 随机数
     * @param min 
     * @param max 
     */
    public static random(min: number, max: number) {
        if (min <= max)
            return Math.floor(min + Math.random() * (max - min + 1));
        else
            return 0;
    }
}