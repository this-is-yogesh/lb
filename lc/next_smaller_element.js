	function nextSmallerEle(nums) {
		let ans = new Array(nums.length).fill(-1);
		let stack = new Array();
		for (let i = 0; i < nums.length; i++) {
			while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
				let topIndex = stack.pop();
				ans[topIndex] = nums[i];
			}
			stack.push(i);
		}
		return ans
		
	}