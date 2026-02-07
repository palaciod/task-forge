import { BUTTON_VARIANTS } from "@/types/theme";


const BOARD_MENU_BUTTONS = [
  {
    label: "BackLog",
    action: (router?: any, projectId?: string) => {
      if (router && projectId) {
        router.push(`/project/${projectId}/backlog`);
      }
    },
    variant: BUTTON_VARIANTS.secondary
  },
  {
    label: "Active Sprint",
    action: (router?: any, projectId?: string, currentSprint?: any) => {
        console.log(projectId, currentSprint);
      if (router && projectId && currentSprint?.id) {
        router.push(`/project/${projectId}/${currentSprint.id}`);
      } else if (router && projectId && !currentSprint) {
        console.error('No active sprint found for this project');
      }
    },
    variant: BUTTON_VARIANTS.secondary
  },
  {
    label: "Burn Down",
    action: (router?: any, projectId?: string) => {
      console.log('To burn down');
    },
    variant: BUTTON_VARIANTS.secondary
  }
];
export { BOARD_MENU_BUTTONS };