<template>
	<div id="app">
		<app-nav @search-click="searchClick"></app-nav>
		<el-popover :value="popoverStatus" width="250" popper-class="right-trans">
			<div class="popover-card">
				<el-switch
					v-model="sortByClass"
					active-text="班级排序"
					inactive-text="默认排序"
				>
				</el-switch>
				<el-select v-model="state.class" placeholder="请选择班级">
					<el-option label="所有班级" :value="''"></el-option>
					<el-option
						v-for="index in 16"
						:key="index"
						:label="index + '班'"
						:value="index"
					>
					</el-option>
				</el-select>
				<el-input v-model="state.name" placeholder="请输入姓名"></el-input>
				<el-input v-model="state.school" placeholder="请输入学校"></el-input>
				<div class="btn-list">
					<el-button @click="state.class = state.name = state.school = ''"
						>重置</el-button
					>
					<el-button @click="popoverStatus = false">关闭</el-button>
				</div>
			</div>
		</el-popover>
		<div class="table-list">
			<el-table
				:data="
					tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
				"
				style="width: 100%"
			>
				<el-table-column
					type="index"
					label="序号"
					align="center"
					width="60"
					:index="e => e + (currentPage - 1) * pageSize + 1"
				>
				</el-table-column>
				<el-table-column
					v-for="index in 3"
					:key="index"
					:label="labelList[index]"
					:prop="propsList[index]"
					align="center"
				></el-table-column>
			</el-table>
		</div>

		<div class="page-pagination">
			<el-pagination
				ref="pagination"
				v-if="width > 768"
				:current-page="currentPage"
				@current-change="
					e => {
						currentPage = e;
					}
				"
				@size-change="
					e => {
						pageSize = e;
					}
				"
				@prev-click="currentPage--"
				@next-click="currentPage++"
				:page-sizes="[5, 10, 20, 50, 100]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.length"
			>
			</el-pagination>

			<el-pagination
				v-else
				:current-page="currentPage"
				layout="prev, pager, next"
				:total="tableData.length"
				@current-change="
					e => {
						currentPage = e;
					}
				"
				@size-change="
					e => {
						pageSize = e;
					}
				"
				@prev-click="currentPage--"
				@next-click="currentPage++"
			>
			</el-pagination>
		</div>
		<app-footer></app-footer>
	</div>
</template>

<script lang="ts">
import {
	createComponent,
	ref,
	reactive,
	computed,
	watch,
	onUnmounted
} from "@vue/composition-api";

import { title, fileRenderList, fileHeader } from "@/utils/config";
import { arrayToJson } from "@/services/rexine/format";
import { getCsvFile } from "@/services/fetch";
import { useWindow } from "@/utils/useHooks";

import appFooter from "@/components/footer.vue";
import appNav from "@/components/nav.vue";

export default createComponent({
	name: "app",
	components: { appNav, appFooter },
	setup() {
		const pageSize = ref(10);
		const currentPage = ref(1);

		const popoverStatus = ref(false);
		const sortByClass = ref(false);

		const sourceData = ref([] as any[]);
		const propsList = ref([] as any[]);

		const { width } = useWindow();
		const labelList = fileHeader;

		const state = reactive({
			class: "",
			name: "",
			school: ""
		});

		const tableData = computed(() => {
			const result = sourceData.value
				.filter(v => !state.class || v.$1 === state.class.toString())
				.filter(v => !state.name || v.$2.includes(state.name.toString()))
				.filter(v => !state.school || v.$3.includes(state.school.toString()));
			return sortByClass.value
				? result.sort((p1: any, p2: any) => Number(p1.$1) - Number(p2.$1))
				: result;
		});

		function searchClick() {
			popoverStatus.value = !popoverStatus.value;
		}

		function created() {
			(async () => {
				const res = await getCsvFile(fileRenderList[0].link);
				sourceData.value = arrayToJson(res);
				for (let i in sourceData.value[0]) {
					propsList.value.push(i);
				}
			})();
		}

		const watchPages = watch(
			[() => state.class, () => state.name, () => state.school],
			() => {
				currentPage.value = 1;
			},
			{
				lazy: true
			}
		);

		onUnmounted(() => {
			watchPages();
		});

		created();

		return {
			state,
			width,
			sourceData,
			labelList,
			propsList,
			pageSize,
			currentPage,
			searchClick,
			tableData,
			popoverStatus,
			sortByClass
		};
	}
});
</script>

<style>
.right-trans {
	right: 10px;
}
</style>

<style lang="less" scoped>
#app {
	.popover-card {
		margin-top: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.el-switch {
			margin: 10px 0px;
		}
		.el-input,
		.el-select {
			width: 95% !important;
			margin: 5px 5px !important;
		}
		.btn-list {
			width: 95%;
			margin: 5px 5px;
			display: flex;
			justify-content: space-between;
		}
	}
	.page-pagination {
		display: flex;
		justify-content: center;
		margin-top: 25px;
	}
}
</style>
