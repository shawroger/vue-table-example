<template>
	<div id="app-footer">
		<p>
			<a href="./data.csv">下载原表格</a> · Powered by
			<a href="https://github.com/shawroger/vue-table-example" target="_blank"
				>vue-table</a
			>
		</p>
	</div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
export default createComponent({
	name: "app-footer"
});
</script>

<style lang="less" scoped>
#app-footer {
	padding: 12px 0px 5px 0px;
	p {
		font-size: 15px;
		text-align: center;
		color: #c0c4cc;
		a {
			text-decoration: none;
			color: lightgrey;
		}
	}
}
</style>
