import { Comments } from "./comments";
import { WorkLog } from "./worklog";
import styles from "./ActivitySection.module.scss";
import { useState } from "react";
import { CommentType } from "../../shared/types/task";

interface ActivitySectionProps {
  comments: CommentType[];
  worklog: any[];
}

export const ActivitySection = ({
  comments,
  worklog,
}: ActivitySectionProps) => {
  const [activeTab, setActiveTab] = useState<"comments" | "worklog">(
    "comments"
  );

  return (
    <div className={styles.activity}>
      <div className={styles.tabs}>
        <button
          className={activeTab === "comments" ? styles.active : ""}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
        <button
          className={activeTab === "worklog" ? styles.active : ""}
          onClick={() => setActiveTab("worklog")}
        >
          Work Log
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "comments" && <Comments comments={comments} />}
        {activeTab === "worklog" && <WorkLog worklog={worklog} />}
      </div>
    </div>
  );
};
