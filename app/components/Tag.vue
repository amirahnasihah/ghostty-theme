<script setup lang="ts">
import type { VariantProps } from "class-variance-authority"
import { tagVariants } from "~/utils/tag-variants"
import { cn } from "~/utils/cn"

type TagKind = NonNullable<VariantProps<typeof tagVariants>["kind"]>

const props = defineProps<{
  kind: TagKind
  label: string
}>()
</script>

<template>
  <span :class="cn(tagVariants({ kind: props.kind }))">{{ props.label }}</span>
</template>
