package com.example.javaserverssqldb.anime_stats;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "anime_stats")
public class Stats {

    @Id
    @Column(name = "mal_id", nullable = false, columnDefinition = "integer")
    private Integer id;

    @Column(name = "watching")
    private Integer watching;

    @Column(name = "completed")
    private Integer completed;

    @Column(name = "on_hold")
    private Integer on_hold;

    @Column(name = "dropped")
    private Integer dropped;

    @Column(name = "plan_to_watch")
    private Integer plan_to_watch;

    @Column(name = "total")
    private Integer total;

    @Column(name = "score_1_votes")
    private Integer score1_votes;

    @Column(name = "score_2_votes")
    private Integer score2_votes;

    @Column(name = "score_3_votes")
    private Integer score3_votes;

    @Column(name = "score_4_votes")
    private Integer score4_votes;

    @Column(name = "score_5_votes")
    private Integer score5_votes;

    @Column(name = "score_6_votes")
    private Integer score6_votes;

    @Column(name = "score_7_votes")
    private Integer score7_votes;

    @Column(name = "score_8_votes")
    private Integer score8_votes;

    @Column(name = "score_9_votes")
    private Integer score9_votes;

    @Column(name = "score_10_votes")
    private Integer score10_votes;



    public Stats(){}

    public Stats(Integer id){
        this.id = id;
    }

    /**
     * Getter and Setters methods
     */
    public Integer getId(){ return this.id; }
    public void setId(Integer id){ this.id = id; }

    public Integer getWatching(){ return this.watching; }
    public void setWatching(Integer watching){ this.watching = watching; }

    public Integer getCompleted(){ return this.completed; }
    public void setCompleted(Integer completed){ this.completed = completed; }

    public Integer getOn_hold(){ return this.on_hold; }
    public void setOn_hold(Integer on_hold){ this.on_hold = on_hold; }

    public Integer getDropped(){ return this.dropped; }
    public void setDropped(Integer dropped){ this.dropped = dropped; }

    public Integer getPlan_to_watch(){ return this.plan_to_watch; }
    public void setPlan_to_watch(Integer plan_to_watch){ this.plan_to_watch = plan_to_watch; }

    public Integer getTotal(){ return this.total; }
    public void setTotal(Integer total){ this.total = total; }

    public Integer getScore1_votes(){ return this.score1_votes; }
    public void setScore1_votes(Integer score1_votes){ this.score1_votes = score1_votes; }

    public Integer getScore2_votes(){ return this.score2_votes; }
    public void setScore2_votes(Integer score2_votes){ this.score2_votes = score2_votes; }

    public Integer getScore3_votes(){ return this.score3_votes; }
    public void setScore3_votes(Integer score3_votes){ this.score3_votes = score3_votes; }

    public Integer getScore4_votes(){ return this.score4_votes; }
    public void setScore4_votes(Integer score4_votes){ this.score4_votes = score4_votes; }

    public Integer getScore5_votes(){ return this.score5_votes; }
    public void setScore5_votes(Integer score5_votes){ this.score5_votes = score5_votes; }

    public Integer getScore6_votes(){ return this.score6_votes; }
    public void setScore6_votes(Integer score6_votes){ this.score6_votes = score6_votes; }

    public Integer getScore7_votes(){ return this.score7_votes; }
    public void setScore7_votes(Integer score7_votes){ this.score7_votes = score7_votes; }

    public Integer getScore8_votes(){ return this.score8_votes; }
    public void setScore8_votes(Integer score8_votes){ this.score8_votes = score8_votes; }

    public Integer getScore9_votes(){ return this.score9_votes; }
    public void setScore9_votes(Integer score9_votes){ this.score9_votes = score9_votes; }

    public Integer getScore10_votes(){ return this.score10_votes; }
    public void setScore10_votes(Integer score10_votes){ this.score10_votes = score10_votes; }



}
