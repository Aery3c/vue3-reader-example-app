<script setup>
</script>

<template>
	<header>
		<nav class="nav-bar">
			<a class="logo-container" href="https://github.com/Aery3c/highlighter/">
				<img alt="Vue logo" class="logo" src="../../assets/logo.svg" width="40" height="40" />
				<span>Highlighter</span>
			</a>

			<div class="content">
				<div class="theme-toggle-container">
					<el-switch size="small" />
				</div>

				<div class="">

				</div>

				<div class="translation-container">
					<el-dropdown>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-language"></use>
						</svg>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>Action 1</el-dropdown-item>
								<el-dropdown-item>Action 2</el-dropdown-item>
								<el-dropdown-item>Action 3</el-dropdown-item>
								<el-dropdown-item>Action 4</el-dropdown-item>
								<el-dropdown-item>Action 5</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>

				<div class="github-link-container">
					<a href="https://github.com/Aery3c/highlighter/">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-github"></use>
						</svg>
					</a>
				</div>

			</div>
		</nav>
	</header>
</template>

<style scoped lang="scss">
header {
	position: sticky;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid var(--el-border-color);
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