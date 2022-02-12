
/**
 * Created to store utilies functions
 */
class Utilities {

    /**
     * remove all child nodes from the Main div which holds all tasks
     * @param {*} parent 
     * @returns 
     */
    removeAllChildNodes(parent) {
        if (parent == null) {
            return;
        }
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

}

export const util = new Utilities();

