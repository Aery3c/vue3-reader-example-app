<script setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton, ElIcon } from 'element-plus';
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';
import logo from '../../assets/logo.svg';

const isDark = useDark();
const toggle = useToggle(isDark);

</script>

<template>
	<header>
		<nav class="nav-bar">
			<a class="logo-container" href="https://github.com/Aery3c/highlighter/">
				<img alt="Vue logo" class="logo" :src="logo" width="40" height="40" />
				<span>Vue Highlighter</span>
			</a>

			<div class="content">
				<div class="theme-toggle-container">
          <ElDropdown>
            <ElButton text>
              <ElIcon>
                <Moon v-if="isDark" :size="20"/>
                <Sunny v-else style="width: 2em; height: 2em;"/>
              </ElIcon>
              {{ isDark ? 'Dark' : 'Light' }}
            </ElButton>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem @click="toggle()">
                  <ElIcon>
                    <Sunny v-if="isDark"/>
                    <Moon v-else/>
                  </ElIcon>
                  {{ isDark ? 'Light' : 'Dark' }}
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
				</div>

<!--				<div class="translation-container">-->
<!--					<ElDropdown>-->
<!--						<svg class="icon" aria-hidden="true">-->
<!--							<use xlink:href="#icon-language"></use>-->
<!--						</svg>-->
<!--						<template #dropdown>-->
<!--							<ElDropdownMenu>-->
<!--								<ElDropdownItem>Action 1</ElDropdownItem>-->
<!--								<ElDropdownItem>Action 2</ElDropdownItem>-->
<!--								<ElDropdownItem>Action 3</ElDropdownItem>-->
<!--								<ElDropdownItem>Action 4</ElDropdownItem>-->
<!--								<ElDropdownItem>Action 5</ElDropdownItem>-->
<!--							</ElDropdownMenu>-->
<!--						</template>-->
<!--					</ElDropdown>-->
<!--				</div>-->

<!--				<div class="github-link-container">-->
<!--					<a href="https://github.com/Aery3c/highlighter/">-->
<!--						<svg class="icon" aria-hidden="true">-->
<!--							<use xlink:href="#icon-github"></use>-->
<!--						</svg>-->
<!--					</a>-->
<!--				</div>-->

			</div>
		</nav>
	</header>
</template>

<style scoped lang="scss">
header {
	position: sticky;
	top: 0;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid var(--el-border-color);
	z-index: 999;
	backdrop-filter: saturate(50%) blur(4px);
	background-image: radial-gradient(transparent 1px,var(--el-bg-color) 1px);
	.nav-bar {
		display: flex;
		justify-content: space-between;
		height: 100%;
		padding: 0 12px 0 32px;
		.logo-container {
			display: flex;
			align-items: center;
			height: 100%;
			text-decoration: none;
			color: hsla(160, 100%, 37%, 1);
		}

		.content {
			display: flex;
			align-items: center;
			height: 100%;

			.theme-toggle-container {
				display: flex;
				height: 24px;
				padding: 0 12px;
			}

			.translation-container,
			.github-link-container {
				height: 24px;
				padding: 0 12px;

				.icon {
					width: 24px;
					height: 24px;
				}
			}
		}
	}
}
</style>