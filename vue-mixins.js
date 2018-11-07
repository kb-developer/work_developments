export const formatPriceMix = {
    methods: {
        formatPrice: function (value, digits) {
            if (!digits)
                digits = 0;
            let val = (value / 1).toFixed(digits).replace(' ', '.');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
        },
    },
};
export const changeQuantityMix = {
    methods: {
		changeLimit: function (value) {
			var self = this;
			self.limit = value;
		},
		minusCount: function (index) {
			var self = this;
			if (self.count - 1 >= self.minCount) {
				self.count = self.count - 1;
			}
		},
		plusCount: function (index) {
			var self = this;
			if (self.count + 1 <= self.maxCount) {
				self.count = self.count + 1;
			}
        }
    }
};

export const formatThousandMix = {
    methods: {
        formatThousand: function (value, digits) {
            if (!digits)
                digits = 0;
            let val = (value / 1).toFixed(digits).replace(' ', '.');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },
    },
};

export const closestNumber = {
	methods: {
		getClosestNum: function(num, arr){
			var i = 0, closest, closestDiff, currentDiff;
			if(arr.length)
			{
				closest = arr[0];
				for(i;i<arr.length;i++)
				{
					closestDiff = Math.abs(num - closest);
					currentDiff = Math.abs(num - arr[i]);
					if(currentDiff < closestDiff)
					{
						closest = arr[i];
					}
					closestDiff = null;
					currentDiff = null;
				}
				//returns first element that is closest to number
				return closest;
			}
			//no length
			return false;
		}
	}
};

window["formatPriceMix"]=formatPriceMix;
window["formatThousandMix"]=formatThousandMix;
window["changeQuantityMix"]=changeQuantityMix;
window['closestNumber'] = closestNumber;
