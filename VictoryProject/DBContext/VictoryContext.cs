using Microsoft.EntityFrameworkCore;
using VictoryProject.Entity;


namespace VictoryProject.DBContext
{
    public class VictoryContext : DbContext
    {
        public VictoryContext()
        {
        }

        public VictoryContext(DbContextOptions<VictoryContext> options)
            : base(options)
        {
        }

        public DbSet<Application> Applications { get; set; }
        public DbSet<ApplicationStatus> ApplicationStatuses { get; set; }
        public DbSet<Contest> Contests { get; set; }
        public DbSet<ContestConfig> ContestConfigs { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRoleContest> UserRoleContests { get; set; }
        public DbSet<Work> Works { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseOracle("Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=DESKTOP-3J3CDF7.dmd.local)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=XE)));User Id=C##MAX;Password=1234;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("C##MAX")
                .HasAnnotation("Relational:Collation", "USING_NLS_COMP");

            modelBuilder.Entity<Application>(entity =>
            {
                entity.ToTable("APPLICATION");

                entity.Property(e => e.Id)
                    .HasPrecision(9)
                    .HasColumnName("ID");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnType("BLOB")
                    .HasColumnName("CONTENT");

                entity.Property(e => e.ContestId)
                    .HasPrecision(9)
                    .HasColumnName("CONTEST_ID");

                entity.Property(e => e.StatusId)
                    .HasPrecision(4)
                    .HasColumnName("STATUS_ID");

                entity.Property(e => e.UserId)
                    .HasPrecision(9)
                    .HasColumnName("USER_ID");

                entity.HasOne(d => d.Contest)
                    .WithMany(p => p.Applications)
                    .HasForeignKey(d => d.ContestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_APPLICATION_CONTEST_ID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Applications)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_APPLICATION_USER_ID");
            });

            modelBuilder.Entity<ApplicationStatus>(entity =>
            {
                entity.ToTable("APPLICATION_STATUS");

                entity.Property(e => e.Id)
                    .HasPrecision(4)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("NAME");
            });

            modelBuilder.Entity<Contest>(entity =>
            {
                entity.ToTable("CONTEST");

                entity.Property(e => e.Id)
                    .HasPrecision(9)
                    .HasColumnName("ID");

                entity.Property(e => e.Comment).HasColumnName("COMMENT");

                entity.Property(e => e.EndDate)
                    .HasColumnType("DATE")
                    .HasColumnName("END_DATE");

                entity.Property(e => e.EndRegistrationDate)
                    .HasColumnType("DATE")
                    .HasColumnName("END_REGISTRATION_DATE");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("NAME");

                entity.Property(e => e.StartDate)
                    .HasColumnType("DATE")
                    .HasColumnName("START_DATE");

                entity.Property(e => e.StartRegistrationDate)
                    .HasColumnType("DATE")
                    .HasColumnName("START_REGISTRATION_DATE");
            });

            modelBuilder.Entity<ContestConfig>(entity =>
            {
                entity.ToTable("CONTEST_CONFIG");

                entity.Property(e => e.Id)
                    .HasPrecision(9)
                    .HasColumnName("ID");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnType("BLOB")
                    .HasColumnName("CONTENT");

                entity.Property(e => e.ContestId)
                    .HasPrecision(9)
                    .HasColumnName("CONTEST_ID");

                entity.HasOne(d => d.Contest)
                    .WithMany(p => p.ContestConfigs)
                    .HasForeignKey(d => d.ContestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CONTEST_CONFIG_CONTEST_ID");
            });

            modelBuilder.Entity<Mark>(entity =>
            {
                entity.ToTable("MARK");

                entity.Property(e => e.Id)
                    .HasPrecision(18)
                    .HasColumnName("ID");

                entity.Property(e => e.JudgeId)
                    .HasPrecision(9)
                    .HasColumnName("JUDGE_ID");

                entity.Property(e => e.Value)
                    .HasPrecision(9)
                    .HasColumnName("VALUE");

                entity.Property(e => e.WorkId)
                    .HasPrecision(9)
                    .HasColumnName("WORK_ID");

                entity.HasOne(d => d.Judge)
                    .WithMany(p => p.Marks)
                    .HasForeignKey(d => d.JudgeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MARK_USER_ID");

                entity.HasOne(d => d.Work)
                    .WithMany(p => p.Marks)
                    .HasForeignKey(d => d.WorkId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MARK_WORK_ID");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("ROLE");

                entity.Property(e => e.Id)
                    .HasPrecision(4)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("NAME");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USER");

                entity.Property(e => e.Id)
                    .HasPrecision(9)
                    .HasColumnName("ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("EMAIL");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("PASSWORD");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("USERNAME");
            });

            modelBuilder.Entity<UserRoleContest>(entity =>
            {
                entity.ToTable("USER_ROLE_CONTEST");

                entity.Property(e => e.Id)
                    .HasPrecision(18)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestId)
                    .HasPrecision(9)
                    .HasColumnName("CONTEST_ID");

                entity.Property(e => e.RoleId)
                    .HasPrecision(4)
                    .HasColumnName("ROLE_ID");

                entity.Property(e => e.UserId)
                    .HasPrecision(9)
                    .HasColumnName("USER_ID");

                entity.HasOne(d => d.Contest)
                    .WithMany(p => p.UserRoleContests)
                    .HasForeignKey(d => d.ContestId)
                    .HasConstraintName("FK_USER_ROLE_CONTEST_CONTEST_ID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoleContests)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_USER_ROLE_CONTEST_ROLE_ID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoleContests)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_USER_ROLE_CONTEST_USER_ID");
            });

            modelBuilder.Entity<Work>(entity =>
            {
                entity.ToTable("WORK");

                entity.Property(e => e.Id)
                    .HasPrecision(9)
                    .HasColumnName("ID");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("CONTENT");

                entity.Property(e => e.ContestId)
                    .HasPrecision(9)
                    .HasColumnName("CONTEST_ID");

                entity.Property(e => e.Extension)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("EXTENSION");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("NAME");

                entity.Property(e => e.UserId)
                    .HasPrecision(9)
                    .HasColumnName("USER_ID");

                entity.HasOne(d => d.Contest)
                    .WithMany(p => p.Works)
                    .HasForeignKey(d => d.ContestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WORK_CONTEST_ID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Works)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WORK_USER_ID");
            });

        }

    }
}
